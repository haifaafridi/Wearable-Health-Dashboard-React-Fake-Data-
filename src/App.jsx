import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';
import { Activity, Heart } from 'lucide-react';

// Generate fake data for 14 days
const generateData = () => {
  const data = [];
  const startDate = new Date('2024-11-15');

  for (let i = 0; i < 14; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    data.push({
      date: date.toISOString().split('T')[0],
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'short' }),
      steps: Math.floor(Math.random() * 5000) + 6000,
      heartRate: Math.floor(Math.random() * 30) + 65,
      // Inject some anomalies
      isAnomaly: Math.random() > 0.85
    });
  }

  // Add a couple specific anomalies for demonstration
  data[5].heartRate = 105;
  data[5].isAnomaly = true;
  data[10].heartRate = 110;
  data[10].isAnomaly = true;

  return data;
};

const FAKE_DATA = generateData();

const WearableDashboard = () => {
  const [metric, setMetric] = useState('steps');
  const [timeRange, setTimeRange] = useState('week');

  const filteredData = useMemo(() => {
    if (timeRange === 'week') {
      return FAKE_DATA.slice(-7);
    }
    return FAKE_DATA;
  }, [timeRange]);

  const metricConfig = {
    steps: {
      label: 'Steps',
      color: '#3b82f6',
      threshold: 10000,
      anomalyThreshold: 3000,
      icon: Activity
    },
    heartRate: {
      label: 'Heart Rate (bpm)',
      color: '#ef4444',
      threshold: 100,
      anomalyThreshold: 100,
      icon: Heart
    }
  };

  const currentConfig = metricConfig[metric];
  const Icon = currentConfig.icon;

  const stats = useMemo(() => {
    const values = filteredData.map(d => d[metric]);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const anomalies = filteredData.filter(d =>
      metric === 'heartRate' ? d[metric] > currentConfig.anomalyThreshold && d.isAnomaly : false
    ).length;

    return { avg: Math.round(avg), max, min, anomalies };
  }, [filteredData, metric, currentConfig]);

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;

    if (metric === 'heartRate' && payload.isAnomaly && payload.heartRate > currentConfig.anomalyThreshold) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#ef4444"
          stroke="#fff"
          strokeWidth={2}
        />
      );
    }

    return <circle cx={cx} cy={cy} r={3} fill={currentConfig.color} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Fitness Tracker</h1>
          <p className="text-slate-600">Monitor your daily activity and health metrics</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setMetric('steps')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${metric === 'steps'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                <Activity size={18} />
                Steps
              </button>
              <button
                onClick={() => setMetric('heartRate')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${metric === 'heartRate'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                <Heart size={18} />
                Heart Rate
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setTimeRange('week')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${timeRange === 'week'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                Last 7 Days
              </button>
              <button
                onClick={() => setTimeRange('twoWeeks')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${timeRange === 'twoWeeks'
                  ? 'bg-slate-800 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                Last 14 Days
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-slate-600 text-sm mb-1">Average</div>
            <div className="text-2xl font-bold text-slate-800">
              {stats.avg}
              {metric === 'heartRate' && <span className="text-sm ml-1">bpm</span>}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-slate-600 text-sm mb-1">Maximum</div>
            <div className="text-2xl font-bold text-green-600">
              {stats.max}
              {metric === 'heartRate' && <span className="text-sm ml-1">bpm</span>}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-slate-600 text-sm mb-1">Minimum</div>
            <div className="text-2xl font-bold text-blue-600">
              {stats.min}
              {metric === 'heartRate' && <span className="text-sm ml-1">bpm</span>}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="text-slate-600 text-sm mb-1">Anomalies</div>
            <div className="text-2xl font-bold text-red-600">
              {metric === 'heartRate' ? stats.anomalies : '—'}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Icon size={24} className={metric === 'steps' ? 'text-blue-500' : 'text-red-500'} />
            <h2 className="text-xl font-semibold text-slate-800">{currentConfig.label} Over Time</h2>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="dayOfWeek"
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#64748b"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value, name) => [
                  `${value}${metric === 'heartRate' ? ' bpm' : ''}`,
                  currentConfig.label
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={metric}
                stroke={currentConfig.color}
                strokeWidth={3}
                dot={<CustomDot />}
                activeDot={{ r: 6 }}
                name={currentConfig.label}
              />
            </LineChart>
          </ResponsiveContainer>

          {metric === 'heartRate' && stats.anomalies > 0 && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="bg-red-500 rounded-full p-1 mt-0.5">
                  <Heart size={14} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-red-800 mb-1">Elevated Heart Rate Detected</div>
                  <div className="text-sm text-red-700">
                    {stats.anomalies} day{stats.anomalies > 1 ? 's' : ''} with heart rate above {currentConfig.anomalyThreshold} bpm (shown as red dots).
                    Consider consulting a healthcare provider if this persists.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Detailed Data</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-600 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-medium">Steps</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-medium">Heart Rate</th>
                  <th className="text-left py-3 px-4 text-slate-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((day, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">{day.date}</td>
                    <td className="py-3 px-4 text-slate-700">{day.steps.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-700">{day.heartRate} bpm</td>
                    <td className="py-3 px-4">
                      {day.isAnomaly && day.heartRate > 100 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          Elevated
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Normal
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WearableDashboard;