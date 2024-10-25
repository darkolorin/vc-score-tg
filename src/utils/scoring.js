// Scoring weights for different metrics
const WEIGHTS = {
  monthlyActiveUsers: 0.25,
  monthlyGrowthRate: 0.20,
  retentionRate: 0.25,
  revenuePerUser: 0.15,
  netPromoterScore: 0.15
};

export const calculateStartupScore = (metrics) => {
  const scores = {
    monthlyActiveUsers: calculateMAUScore(metrics.monthlyActiveUsers),
    monthlyGrowthRate: calculateGrowthScore(metrics.monthlyGrowthRate),
    retentionRate: calculateRetentionScore(metrics.retentionRate),
    revenuePerUser: calculateRevenueScore(metrics.revenuePerUser),
    netPromoterScore: calculateNPSScore(metrics.netPromoterScore)
  };

  // Calculate weighted average
  return Object.keys(scores).reduce((total, metric) => {
    return total + (scores[metric] * WEIGHTS[metric]);
  }, 0);
};

const calculateMAUScore = (mau) => {
  if (mau >= 1000000) return 100;
  if (mau >= 100000) return 80;
  if (mau >= 10000) return 60;
  if (mau >= 1000) return 40;
  return 20;
};

const calculateGrowthScore = (growth) => {
  if (growth >= 20) return 100;
  if (growth >= 10) return 80;
  if (growth >= 5) return 60;
  if (growth >= 2) return 40;
  return 20;
};

const calculateRetentionScore = (retention) => {
  if (retention >= 60) return 100;
  if (retention >= 40) return 80;
  if (retention >= 20) return 60;
  if (retention >= 10) return 40;
  return 20;
};

const calculateRevenueScore = (arpu) => {
  if (arpu >= 100) return 100;
  if (arpu >= 50) return 80;
  if (arpu >= 20) return 60;
  if (arpu >= 5) return 40;
  return 20;
};

const calculateNPSScore = (nps) => {
  if (nps >= 70) return 100;
  if (nps >= 50) return 80;
  if (nps >= 30) return 60;
  if (nps >= 10) return 40;
  return 20;
};
