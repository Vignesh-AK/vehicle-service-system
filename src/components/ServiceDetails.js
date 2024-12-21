import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid, Card, CardContent, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServiceDetails = () => {
  const { serviceId } = useParams(); // Get the service ID from the URL
  const [service, setService] = useState(null);
  const [billId, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/services/${serviceId}/`);
        setBill(response.data.bill.id)
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  if (loading) return <div>Loading...</div>;

  const handlePayNow = () => {
    // Implement the payment logic here
    navigate(`/bills/${billId}`); // Navigate to the service details page
    console.log("Payment initiated for service ID:", billId);
    // You can make an API call to process the payment or navigate to a payment page
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        {service.vehicle.make} {service.vehicle.model}
      </Typography>
      <Typography variant="h6">
        Registration Number: {service.registration_number}
      </Typography>
      <Typography variant="h6">
        Year: {service.vehicle.year}
      </Typography>
      <Typography variant="h6">
        Status: {service.status_display}
      </Typography>
      <Typography variant="h6">
        Payment Status: {service.bill.status_display}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Cost: ₹{service.total_cost}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Issues</Typography>
              <List>
                {service.issues.length > 0 ? (
                  service.issues.map((issue) => (
                    <Grid item xs={12} md={6}>
                    <ListItem key={issue.id}>
                      <ListItemText 
                        primary={issue.component.name} 
                        secondary={issue.issue_description} 
                      />
                       
                    </ListItem>
                   
                    </Grid>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No issues reported" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pay Now Button */}
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePayNow} // Handle Pay Now button click
          >
            View Bill
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceDetails;