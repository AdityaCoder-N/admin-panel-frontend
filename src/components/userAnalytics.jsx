import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const UserAnalytics = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); 

  // refs to handle chart and canvas
  const chartRef = useRef(null);
  const chartInstance = useRef(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/users');
        const usersData = response.data;
        setUsers(usersData); 
        updateChart(usersData, timeRange); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      updateChart(users, timeRange);
    }
  }, [timeRange, users]);

  const updateChart = (userData, range) => {
    const chartData = filterAndTransformUserData(userData, range);
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    createChart(chartData);
  };

  const filterAndTransformUserData = (users, range) => {
    const now = new Date();
    let startDate;

    switch (range) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); 
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); 
        break;
      case '15d':
        startDate = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000); 
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); 
        break;
      default:
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); 
    }

    const filteredUsers = users.filter((user) => {
      const createdAt = new Date(user.createdAt);
      return createdAt >= startDate && createdAt <= now;
    });

    return generateChartData(filteredUsers, range);
  };

  // Helper to generate chart data
  const generateChartData = (filteredUsers, range) => {
    const now = new Date();
    const registrationCounts = {};
    const labels = [];

    for (let i = 0; i < getIntervalCount(range); i++) {
      const dateLabel = new Date(now.getTime() - i * 24 * 60 * 60 * 1000).toLocaleDateString();
      registrationCounts[dateLabel] = 0;
      labels.push(dateLabel);
    }

    filteredUsers.forEach((user) => {
      const dateLabel = new Date(user.createdAt).toLocaleDateString();
      if (registrationCounts[dateLabel] !== undefined) {
        registrationCounts[dateLabel]++;
      }
    });

    return {
      labels: labels.reverse(),
      datasets: [
        {
          label: 'User Registrations',
          data: Object.values(registrationCounts).reverse(),
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)',
          tension: 0.2,
        },
      ],
    };
  };

  const getIntervalCount = (range) => {
    switch (range) {
      case '24h':
        return 1;
      case '7d':
        return 7;
      case '15d':
        return 15;
      case '30d':
        return 30;
      default:
        return 1;
    }
  };

  const createChart = (data) => {
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Registrations',
            },
          },
        },
      },
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Registration Analytics</h2>

      <div className="flex justify-between mb-6">
        <button
          onClick={() => setTimeRange('24h')}
          className={`px-4 py-2 rounded-md transition-all ${
            timeRange === '24h' ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Last 24 hours
        </button>
        <button
          onClick={() => setTimeRange('7d')}
          className={`px-4 py-2 rounded-md transition-all ${
            timeRange === '7d' ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Last 7 days
        </button>
        <button
          onClick={() => setTimeRange('15d')}
          className={`px-4 py-2 rounded-md transition-all ${
            timeRange === '15d' ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Last 15 days
        </button>
        <button
          onClick={() => setTimeRange('30d')}
          className={`px-4 py-2 rounded-md transition-all ${
            timeRange === '30d' ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Last 30 days
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <canvas ref={chartRef} className="w-full h-96"></canvas>
      )}
    </div>
  );
};

export default UserAnalytics;
