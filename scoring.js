import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, Users, Target, Award, 
  Heart, Share2, Smartphone, Clock,
  Zap, MessageCircle
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

const StartupScorer = () => {
  const [metrics, setMetrics] = useState({
    dau: '',                    // Daily Active Users
    dauToMau: '',              // DAU/MAU Ratio (%)
    retentionD1: '',           // Day 1 Retention (%)
    retentionD30: '',          // Day 30 Retention (%)
    viralityK: '',             // K-factor
    sessionLength: '',         // Avg Session Length (minutes)
    sessionsPerDay: '',        // Sessions per User per Day
    timeToValue: '',          // Time to Core Action (minutes)
    growthRate: '',           // Monthly Growth Rate (%)
    appStoreRating: ''        // App Store Rating (1-5)
  });

  const [scores, setScores] = useState(null);
  const [overallScore, setOverallScore] = useState(null);

  const calculateMetricScore = (value, metric) => {
    const scoringRules = {
      dau: {
        max: 100000,
        weight: 0.15,
        calculate: (v) => Math.min((v / 100000) * 100, 100),
        benchmark: "Top consumer apps typically have 100k+ DAU"
      },
      dauToMau: {
        max: 50,
        weight: 0.15,
        calculate: (v) => Math.min((v / 50) * 100, 100),
        benchmark: "Best-in-class apps achieve 50%+ DAU/MAU ratio"
      },
      retentionD1: {
        max: 60,
        weight: 0.1,
        calculate: (v) => Math.min((v / 60) * 100, 100),
        benchmark: "Strong D1 retention is 60%+"
      },
      retentionD30: {
        max: 20,
        weight: 0.15,
        calculate: (v) => Math.min((v / 20) * 100, 100),
        benchmark: "Good D30 retention is 20%+"
      },
      viralityK: {
        max: 1.5,
        weight: 0.1,
        calculate: (v) => Math.min((v / 1.5) * 100, 100),
        benchmark: "Viral apps achieve K > 1"
      },
      sessionLength: {
        max: 15,
        weight: 0.05,
        calculate: (v) => Math.min((v / 15) * 100, 100),
        benchmark: "Engaging apps see 15+ minute sessions"
      },
      sessionsPerDay: {
        max: 5,
        weight: 0.1,
        calculate: (v) => Math.min((v / 5) * 100, 100),
        benchmark: "Top apps see 5+ sessions per day"
      },
      timeToValue: {
        max: 5,
        weight: 0.1,
        calculate: (v) => Math.max(0, Math.min(((5 - v) / 5) * 100, 100)),
        benchmark: "Best apps deliver value in < 5 minutes"
      },
      growthRate: {
        max: 30,
        weight: 0.05,
        calculate: (v) => Math.min((v / 30) * 100, 100),
        benchmark: "Strong apps grow 30%+ monthly"
      },
      appStoreRating: {
        max: 5,
        weight: 0.05,
        calculate: (v) => Math.min((v / 5) * 100, 100),
        benchmark: "Top apps maintain 4.5+ rating"
      }
    };

    const rule = scoringRules[metric];
    const numValue = parseFloat(value) || 0;
    return {
      raw: numValue,
      score: rule.calculate(numValue),
      weight: rule.weight,
      weighted: rule.calculate(numValue) * rule.weight,
      benchmark: rule.benchmark
    };
  };

  const calculateScores = () => {
    const metricScores = {};
    let totalScore = 0;

    Object.keys(metrics).forEach(metric => {
      const result = calculateMetricScore(metrics[metric], metric);
      metricScores[metric] = result;
      totalScore += result.weighted;
    });

    setScores(metricScores);
    setOverallScore(Math.round(totalScore));
  };

  const handleInputChange = (e) => {
    setMetrics({
      ...metrics,
      [e.target.name]: e.target.value
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricFeedback = (metric, score) => {
    const feedbackRules = {
      dau: {
        good: "Strong daily user base indicating product stickiness",
        medium: "Growing user base - focus on activation",
        poor: "Need to improve daily active users through better engagement"
      },
      dauToMau: {
        good: "Excellent user engagement frequency",
        medium: "Room to improve daily engagement",
        poor: "Need to increase regular usage patterns"
      },
      retentionD1: {
        good: "Strong first-day retention indicating good onboarding",
        medium: "Improve onboarding to boost early retention",
        poor: "Critical need to enhance first-time user experience"
      },
      retentionD30: {
        good: "Excellent long-term retention showing strong product-market fit",
        medium: "Focus on improving long-term value delivery",
        poor: "Need to build stronger user habits"
      },
      viralityK: {
        good: "Strong viral coefficient driving organic growth",
        medium: "Some viral growth - optimize sharing features",
        poor: "Enhance viral loops and sharing mechanisms"
      },
      sessionLength: {
        good: "Users finding sustained value in each session",
        medium: "Room to deepen engagement per session",
        poor: "Need to increase session value and engagement"
      },
      sessionsPerDay: {
        good: "Users have built strong daily habits",
        medium: "Good usage frequency with room for improvement",
        poor: "Focus on increasing usage frequency"
      },
      timeToValue: {
        good: "Quick time-to-value showing efficient onboarding",
        medium: "Optimize onboarding to deliver value faster",
        poor: "Streamline path to core value proposition"
      },
      growthRate: {
        good: "Strong organic growth trajectory",
        medium: "Steady growth with potential to accelerate",
        poor: "Need to identify and optimize growth levers"
      },
      appStoreRating: {
        good: "Users highly satisfied with app experience",
        medium: "Good satisfaction with room for improvement",
        poor: "Address user feedback and improve experience"
      }
    };

    if (score >= 80) return feedbackRules[metric].good;
    if (score >= 60) return feedbackRules[metric].medium;
    return feedbackRules[metric].poor;
  };

  const getMetricIcon = (metric) => {
    const icons = {
      dau: <Users className="w-4 h-4" />,
      dauToMau: <Heart className="w-4 h-4" />,
      retentionD1: <Zap className="w-4 h-4" />,
      retentionD30: <Target className="w-4 h-4" />,
      viralityK: <Share2 className="w-4 h-4" />,
      sessionLength: <Clock className="w-4 h-4" />,
      sessionsPerDay: <Smartphone className="w-4 h-4" />,
      timeToValue: <TrendingUp className="w-4 h-4" />,
      growthRate: <TrendingUp className="w-4 h-4" />,
      appStoreRating: <MessageCircle className="w-4 h-4" />
    };
    return icons[metric];
  };

  const getMetricLabel = (metric) => {
    const labels = {
      dau: "Daily Active Users",
      dauToMau: "DAU/MAU Ratio (%)",
      retentionD1: "Day 1 Retention (%)",
      retentionD30: "Day 30 Retention (%)",
      viralityK: "Virality K-factor",
      sessionLength: "Avg Session Length (mins)",
      sessionsPerDay: "Sessions per User per Day",
      timeToValue: "Time to Core Action (mins)",
      growthRate: "Monthly Growth Rate (%)",
      appStoreRating: "App Store Rating (1-5)"
    };
    return labels[metric];
  };

  const getRadarData = () => {
    if (!scores) return [];
    return Object.keys(scores).map(metric => ({
      metric: getMetricLabel(metric).split(' ')[0],
      score: scores[metric].score
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-6 h-6" />
          Consumer App Scorer
        </CardTitle>
        <CardDescription>
          Evaluate your consumer app against key engagement and retention metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(metrics).map(metric => (
            <div key={metric}>
              <Label className="flex items-center gap-2">
                {getMetricIcon(metric)}
                {getMetricLabel(metric)}
              </Label>
              <Input
                type="number"
                name={metric}
                value={metrics[metric]}
                onChange={handleInputChange}
                placeholder={`Enter ${getMetricLabel(metric).toLowerCase()}`}
                className="mt-1"
              />
            </div>
          ))}
        </div>

        <Button 
          onClick={calculateScores}
          className="w-full"
        >
          Analyze App Metrics
        </Button>

        {scores && (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}/100
              </div>
              <div className="mt-2 text-gray-600">
                Overall App Score
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={getRadarData()}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Metrics"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {Object.keys(scores).map(metric => (
                <div key={metric} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="flex items-center gap-2">
                      {getMetricIcon(metric)}
                      {getMetricLabel(metric)}
                    </Label>
                    <span className={`font-bold ${getScoreColor(scores[metric].score)}`}>
                      {Math.round(scores[metric].score)}/100
                    </span>
                  </div>
                  <Progress value={scores[metric].score} />
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      {getMetricFeedback(metric, scores[metric].score)}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      Benchmark: {scores[metric].benchmark}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StartupScorer;