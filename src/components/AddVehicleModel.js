import React, { useState, useEffect } from 'react';
import { Paper, Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';

export default function AddVehicleModel() {
  //  State for Vehicles List
  const [vehicles, setVehicles] = useState([]);

  //  State for Vehicle Form
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  //  Fetch Existing Vehicles
  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axios.get('http://localhost:8000/vehicles/');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    }
    fetchVehicles();
  }, []);

  //  Handle Form Submission
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    const data = { make, model, year: parseInt(year) };

    try {
      await axios.post('http://localhost:8000/vehicles/', data);
      alert('Vehicle added successfully!');
      setMake('');
      setModel('');
      setYear('');
      
      // Refresh vehicle list
      const response = await axios.get('http://localhost:8000/vehicles/');
      setVehicles(response.data);
    } catch (error) {
      console.error('Error adding vehicle:', error);
      alert('Failed to add vehicle');
    }
  };

  return (
    <Paper sx={{ mt: 4, p: 3 }}>
      {/*  Title */}
      <Typography variant="h4" gutterBottom>
        Vehicle Management
      </Typography>

      {/*  Vehicle List */}
      <Typography variant="h5" sx={{ mt: 2 }}>Existing Vehicles</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/*  Add Vehicle Form */}
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5">Add New Vehicle</Typography>
          <form onSubmit={handleAddVehicle}>
            <TextField
              label="Make"
              fullWidth
              margin="normal"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
            <TextField
              label="Model"
              fullWidth
              margin="normal"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
            <TextField
              label="Year"
              type="number"
              fullWidth
              margin="normal"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Add Vehicle
            </Button>
          </form>
        </Paper>
      </Box>
    </Paper>
  );
}