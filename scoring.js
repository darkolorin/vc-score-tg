const telegram = window.Telegram.WebApp;

// Initialize Telegram Mini App
telegram.ready();

const StartupScorer = () => {
  const [metrics, setMetrics] = React.useState({
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

  const [scores, setScores] = React.useState(null);
  const [overallScore, setOverallScore] = React.useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMetrics(prevMetrics => ({
      ...prevMetrics,
      [name]: value
    }));
  };

  const calculateMetricScore = (metric, value) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) return 0;

    switch (metric) {
      case 'dau':
        // Example: Score based on DAU thresholds
        if (parsedValue > 1000000) return 100;
        if (parsedValue > 500000) return 80;
        if (parsedValue > 100000) return 60;
        return 40;

      case 'dauToMau':
        // Example: Score based on DAU/MAU ratio
        if (parsedValue > 30) return 100;
        if (parsedValue > 20) return 80;
        if (parsedValue > 10) return 60;
        return 40;

      case 'retentionD1':
        // Example: Score based on Day 1 retention
        if (parsedValue > 50) return 100;
        if (parsedValue > 40) return 80;
        if (parsedValue > 30) return 60;
        return 40;

      case 'retentionD30':
        // Example: Score based on Day 30 retention
        if (parsedValue > 20) return 100;
        if (parsedValue > 15) return 80;
        if (parsedValue > 10) return 60;
        return 40;

      case 'viralityK':
        // Example: Score based on K-factor
        if (parsedValue > 1.5) return 100;
        if (parsedValue > 1.2) return 80;
        if (parsedValue > 1.0) return 60;
        return 40;

      case 'sessionLength':
        // Example: Score based on average session length
        if (parsedValue > 30) return 100;
        if (parsedValue > 20) return 80;
        if (parsedValue > 10) return 60;
        return 40;

      case 'sessionsPerDay':
        // Example: Score based on sessions per user per day
        if (parsedValue > 5) return 100;
        if (parsedValue > 3) return 80;
        if (parsedValue > 1) return 60;
        return 40;

      case 'timeToValue':
        // Example: Score based on time to core action
        if (parsedValue < 5) return 100;
        if (parsedValue < 10) return 80;
        if (parsedValue < 20) return 60;
        return 40;

      case 'growthRate':
        // Example: Score based on monthly growth rate
        if (parsedValue > 20) return 100;
        if (parsedValue > 10) return 80;
        if (parsedValue > 5) return 60;
        return 40;

      case 'appStoreRating':
        // Example: Score based on app store rating
        if (parsedValue >= 4.5) return 100;
        if (parsedValue >= 4.0) return 80;
        if (parsedValue >= 3.5) return 60;
        return 40;

      default:
        return 0;
    }
  };

  const calculateScores = () => {
    const newScores = {};
    let totalScore = 0;
    let count = 0;

    for (const metric in metrics) {
      const score = calculateMetricScore(metric, metrics[metric]);
      newScores[metric] = {
        score,
        benchmark: 'Example Benchmark' // Replace with actual benchmark logic
      };
      totalScore += score;
      count++;
    }

    setScores(newScores);
    setOverallScore(totalScore / count);
  };

  const getMetricLabel = (metric) => {
    const labels = {
      dau: 'Daily Active Users',
      dauToMau: 'DAU/MAU Ratio',
      retentionD1: 'Day 1 Retention',
      retentionD30: 'Day 30 Retention',
      viralityK: 'K-factor',
      sessionLength: 'Avg Session Length',
      sessionsPerDay: 'Sessions per User per Day',
      timeToValue: 'Time to Core Action',
      growthRate: 'Monthly Growth Rate',
      appStoreRating: 'App Store Rating'
    };
    return labels[metric];
  };

  const getMetricIcon = (metric) => {
    const icons = {
      dau: '👥',
      dauToMau: '❤️',
      retentionD1: '⚡',
      retentionD30: '🎯',
      viralityK: '🔄',
      sessionLength: '⏰',
      sessionsPerDay: '📱',
      timeToValue: '📈',
      growthRate: '🚀',
      appStoreRating: '💬'
    };
    return icons[metric];
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricFeedback = (metric, score) => {
    // Implement your logic to provide feedback based on the score
    return `Feedback for ${metric}: ${score}`; // Example feedback
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">
          <span className="icon">🏆</span>
          Consumer App Scorer
        </h1>
        <p className="card-description">
          Evaluate your consumer app against key engagement and retention metrics
        </p>
      </div>
      <div className="card-content">
        <div className="input-grid">
          {Object.keys(metrics).map(metric => (
            <div key={metric}>
              <label className="input-label">
                <span className="icon">{getMetricIcon(metric)}</span>
                {getMetricLabel(metric)}
              </label>
              <input
                type="number"
                name={metric}
                value={metrics[metric]}
                onChange={handleInputChange}
                placeholder={`Enter ${getMetricLabel(metric).toLowerCase()}`}
                className="input"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={calculateScores}
          className="button"
        >
          Analyze App Metrics
        </button>

        {scores && (
          <div className="results">
            <div className="overall-score">
              <div className={`score ${getScoreColor(overallScore)}`}>
                {overallScore}/100
              </div>
              <div className="score-label">
                Overall App Score
              </div>
            </div>

            <div className="metric-scores">
              {Object.keys(scores).map(metric => (
                <div key={metric} className="metric-score">
                  <div className="metric-header">
                    <label className="metric-label">
                      <span className="icon">{getMetricIcon(metric)}</span>
                      {getMetricLabel(metric)}
                    </label>
                    <span className={`score ${getScoreColor(scores[metric].score)}`}>
                      {Math.round(scores[metric].score)}/100
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{width: `${scores[metric].score}%`}}
                    ></div>
                  </div>
                  <div className="metric-feedback">
                    <p className="feedback">
                      {getMetricFeedback(metric, scores[metric].score)}
                    </p>
                    <p className="benchmark">
                      Benchmark: {scores[metric].benchmark}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Render the app
ReactDOM.render(<StartupScorer />, document.getElementById('root'));
