import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import dayjs from 'dayjs'; // To format dates

export default function Graphs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchRevenueData() {
      try {
        const response = await axios.get('http://localhost:8000/payments/');
        const transformedData = response.data.map(item => ({
          date: dayjs(item.date).format('YYYY-MM-DD'),  // Format date for the X-axis
          total_cost: parseFloat(item.total_cost),       // Ensure total_cost is a number
        }));
        setData(transformedData);  // Set transformed data
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    }
    fetchRevenueData();
  }, []);

  return (
    <Paper sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Revenue Graph</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />  {/* Using date as the X-axis */}
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total_cost" stroke="#8884d8" /> {/* Plot total_cost */}
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}