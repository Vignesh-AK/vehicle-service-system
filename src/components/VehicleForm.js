import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';

export default function VehicleForm() {
  const [issueDescription, setIssueDescription] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [component, setComponent] = useState('');
  const [isRepair, setIsRepair] = useState(true); // Default to true for repair
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [existingVehicle, setExistingVehicle] = useState('');
  const [issues, setIssues] = useState([]);
  console.log(existingVehicle)
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vehicles/');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    const fetchComponents = async () => {
      try {
        const response = await axios.get('http://localhost:8000/components/');
        setComponents(response.data);
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    };

    fetchVehicles();
    fetchComponents();
  }, []);

  const handleAddIssue = () => {
    if (issueDescription && component) {
      const newIssue = {
        issue_description: issueDescription,
        component,
        is_repair: isRepair,
      };
      setIssues([...issues, newIssue]);
      setIssueDescription('');
      setComponent('');
      setIsRepair(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vehicleData = existingVehicle
      ? { vehicle_id: existingVehicle, issues }
      : { make, model, year, issues };

    try {
      const response = await axios.post('http://localhost:8000/vehicles/', vehicleData);
      console.log('Vehicle registered:', response.data);
      setIssues([]);
      setExistingVehicle('');
      setMake('');
      setModel('');
      setYear('');
    } catch (error) {
      console.error('Error registering vehicle:', error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5">Register Vehicle</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Select Existing Vehicle"
            fullWidth
            margin="normal"
            value={existingVehicle}
            onChange={(e) => setExistingVehicle(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </MenuItem>
            ))}
          </TextField>
          {!existingVehicle && (
            <>
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
                fullWidth
                margin="normal"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </>
          )}
          <TextField
            label="Issue Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
          />
          <TextField
            select
            label="Select Component"
            fullWidth
            margin="normal"
            value={component}
            onChange={(e) => setComponent(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            {components.map((comp) => (
              <MenuItem key={comp.id} value={comp.id}>
                {comp.name} (Price: ${comp.new_price})
              </MenuItem>
            ))}
          </TextField>
          {/* Option to choose between repair or replace */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Repair or Replace</InputLabel>
            <Select
              value={isRepair ? "repair" : "replace"}
              onChange={(e) => setIsRepair(e.target.value === "repair")}
            >
              <MenuItem value="repair">Repair</MenuItem>
              <MenuItem value="replace">Replace</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAddIssue} sx={{ mt: 2 }}>
            Add Issue
          </Button>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Issues:</Typography>
            {issues.map((issue, index) => (
              <Typography key={index}>
                {issue.issue_description} - Component ID: {issue.component} - {issue.is_repair ? 'Repair' : 'Replace'}
              </Typography>
            ))}
          </Box>
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}