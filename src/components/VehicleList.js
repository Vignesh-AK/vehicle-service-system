import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/services/');
        console.log(response.data)
        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };
    fetchVehicles();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/vehicles/${id}`); // Navigate to vehicle details page
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{paddingTop:'4rem'}}> 
        Vehicle List
      </Typography>
      <Grid container spacing={2}>
        {vehicles.map((vehicle) => (

          <Grid item xs={12} sm={6} md={6} key={vehicle.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" style={{ paddingTop: '20px' }}>
                  {vehicle.make} {vehicle.model}
                </Typography>
                <Typography color="text.secondary" style={{ paddingTop: '20px' }}>
                  Year: {vehicle.year}
                </Typography>
                
                <Typography color="text.secondary"  style={{ paddingTop: '20px' }}>
                  Status: {vehicle.status_display}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px'  }}
                  onClick={() => handleViewDetails(vehicle.id)} // Call function on button click
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VehicleList;