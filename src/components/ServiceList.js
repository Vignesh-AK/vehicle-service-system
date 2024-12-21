import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/services/');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/services/${id}`); // Navigate to the service details page
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Service List
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {service.registration_number}
                </Typography>
                <Typography color="text.secondary" style={{ paddingTop: '10px' }}>
                  Status: {service.status_display}
                </Typography>
                <Typography color="text.secondary" style={{ paddingTop: '10px' }}>
                  Payment Status: {service.bill.status_display}
                </Typography>
                <Typography color="text.secondary" style={{ paddingTop: '10px' }}>
                  Total Cost: ₹{service.total_cost}
                </Typography>

                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  onClick={() => handleViewDetails(service.id)} // Navigate to the service details page
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

export default ServiceList;