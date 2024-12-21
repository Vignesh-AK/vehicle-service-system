import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function ServiceForm() {
  const [issueDescription, setIssueDescription] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [component, setComponent] = useState('');
  const [isRepair, setIsRepair] = useState(true); // Default to true for repair
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [existingVehicle, setExistingVehicle] = useState('');
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Fetch the list of vehicles
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vehicles/');
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  // Fetch components based on selected vehicle
  useEffect(() => {
    const fetchComponents = async () => {
      if (existingVehicle) {
        try {
          const response = await axios.get(`http://localhost:8000/vehicles/${existingVehicle}/components/`);
          setComponents(response.data);
        } catch (error) {
          console.error('Error fetching components:', error);
        }
      } else {
        setComponents([]); // Clear components if no vehicle is selected
      }
    };

    fetchComponents();
  }, [existingVehicle]); // Fetch components whenever `existingVehicle` changes

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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for service
    const serviceData = {
      vehicle_id: existingVehicle,
      registration_number: registrationNumber,
      issue_description: issueDescription,
      status: 2, // Assuming Pending status by default, you can customize this
      issues: issues.map((issue) => ({
        component_id: issue.component,
        is_repair: issue.is_repair,
        cost: issue.is_repair ? issue.cost : issue.component.new_price, // Assuming the cost for repair/replace
        status: 2, // Assuming On Hold by default, customize as needed
        issue_description: issue.issue_description,
      })),
    };

    try {
      // Send the service and issue data to the service endpoint
      const response = await axios.post('http://localhost:8000/services/create', serviceData);
      
      console.log('Service created successfully:', response.data);
      
      // Reset form after successful submission
      setIssues([]);
      setExistingVehicle('');
      setRegistrationNumber('');
      setIssueDescription('');
      setComponent('');
      setIsRepair(true);
      navigate(`/bills/${response.data.bill_id}`);
    } catch (error) {
      console.error('Error creating service:', error);
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

          {/* Render new vehicle fields if no existing vehicle is selected */}
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
            label="Registration Number"
            fullWidth
            margin="normal"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
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
              value={isRepair ? 'repair' : 'replace'}
              onChange={(e) => setIsRepair(e.target.value === 'repair')}
            >
              <MenuItem value="repair">Repair</MenuItem>
              <MenuItem value="replace">Replace</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleAddIssue} sx={{ mt: 2 }}>
            Add Issue
          </Button>

          {/* Display added issues */}
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