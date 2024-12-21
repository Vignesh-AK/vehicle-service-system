import React, { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

export default function ComponentsPage() {
  const [pricing, setPricing] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [name, setName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [repairPrice, setRepairPrice] = useState('');

  // 🟢 Fetch Components and Vehicles
  useEffect(() => {
    async function fetchData() {
      try {
        const [componentsResponse, vehiclesResponse] = await Promise.all([
          axios.get('http://localhost:8000/components/'),
          axios.get('http://localhost:8000/vehicles/'),
        ]);
        setPricing(componentsResponse.data);
        setVehicles(vehiclesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // 🟢 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedVehicle) {
      alert('Please select a vehicle!');
      return;
    }

    const data = {
      name,
      new_price: newPrice,
      repair_price: repairPrice,
      vehicle: selectedVehicle,
    };

    try {
      await axios.post('http://localhost:8000/components/', data);
      alert('Component added successfully!');
      setName('');
      setNewPrice('');
      setRepairPrice('');
      setSelectedVehicle('');

      // Refetch components
      const componentsResponse = await axios.get('http://localhost:8000/components/');
      setPricing(componentsResponse.data);
    } catch (error) {
      console.error('Error adding component:', error);
    }
  };

  return (
    <Paper sx={{ mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Component Pricing
      </Typography>

      {/* 🟢 Components Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Component</TableCell>
              <TableCell>Repair Price</TableCell>
              <TableCell>Purchase Price</TableCell>
              <TableCell>Vehicle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pricing.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.repair_price}</TableCell>
                <TableCell>{row.new_price}</TableCell>
                <TableCell>{row.vehicle_details.make} {row.vehicle_details.model}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 🟢 Add Component Form */}
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5">Add Component</Typography>
          <form onSubmit={handleSubmit}>
            {/* Vehicle Dropdown */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Vehicle</InputLabel>
              <Select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                label="Vehicle"
              >
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.make} {vehicle.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Component Details */}
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
              label="Repair Price"
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