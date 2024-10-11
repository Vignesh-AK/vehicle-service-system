import React, { useEffect, useState } from 'react';
import { Paper, Box, Table, TextField, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
import axios from 'axios';

export default function PaymentPage() {
  const [pricing, setPricing] = useState([]);
  const [name, setName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [repairPrice, setRepairPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, new_price: newPrice, repair_price: repairPrice };
    await axios.post('http://localhost:8000/components/', data);
  };
  useEffect(() => {
    async function fetchPricing() {
      try {
        const response = await axios.get('http://localhost:8000/components/');
        setPricing(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    }
    fetchPricing();
  }, []);

  return (
    <Paper sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>Component Pricing</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Repair Price</TableCell>
              <TableCell>Purchase Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pricing.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.repair_price}</TableCell>
                <TableCell>{row.new_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5">Add Component</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="New Price"
              fullWidth
              margin="normal"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />

            <TextField
              label="Repair"
              fullWidth
              margin="normal"
              value={repairPrice}
              onChange={(e) => setRepairPrice(e.target.value)}
            />

            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    </Paper>
  );
}