import { useState } from 'react';
import { TextInput, Button, Paper, Title, Stack } from '@mantine/core';
import { calculateStartupScore } from '../utils/scoring';
import MetricInput from './MetricInput';

export default function ScoreForm() {
  const [metrics, setMetrics] = useState({
    monthlyActiveUsers: '',
    monthlyGrowthRate: '',
    retentionRate: '',
    revenuePerUser: '',
    netPromoterScore: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = calculateStartupScore(metrics);
    // Handle the score display
  };

  const handleChange = (metric, value) => {
    setMetrics(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  return (
    <Paper p="md" shadow="sm">
      <Title order={2} mb="md">Startup Scoring</Title>
      <form onSubmit={handleSubmit}>
        <Stack spacing="md">
          <MetricInput
            label="Monthly Active Users"
            value={metrics.monthlyActiveUsers}
            onChange={(value) => handleChange('monthlyActiveUsers', value)}
          />
          <MetricInput
            label="Monthly Growth Rate (%)"
            value={metrics.monthlyGrowthRate}
            onChange={(value) => handleChange('monthlyGrowthRate', value)}
          />
          <MetricInput
            label="Retention Rate (%)"
            value={metrics.retentionRate}
            onChange={(value) => handleChange('retentionRate', value)}
          />
          <MetricInput
            label="Revenue Per User ($)"
            value={metrics.revenuePerUser}
            onChange={(value) => handleChange('revenuePerUser', value)}
          />
          <MetricInput
            label="Net Promoter Score"
            value={metrics.netPromoterScore}
            onChange={(value) => handleChange('netPromoterScore', value)}
          />
          <Button type="submit" fullWidth>
            Calculate Score
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
