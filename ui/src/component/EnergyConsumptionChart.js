import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import ChartDataForm from './ChartDataForm'; // Assuming you have a component for the form

const ChartPage = () => {
  const [chartData, setChartData] = useState([]);

  // Function to update chart data
  const updateChartData = (newData) => {
    setChartData(newData);
  };

  useEffect(() => {
    // Fetch initial chart data when the page loads
    axios
      .get('/api/chart-data')
      .then((response) => {
        setChartData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching initial chart data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Energy Consumption Chart</h2>
      <LineChart
        width={500}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_kwh" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>

      {/* Render the chart data form and pass the updateChartData function */}
      <ChartDataForm updateChartData={updateChartData} />
    </div>
  );
};

export default ChartPage;
