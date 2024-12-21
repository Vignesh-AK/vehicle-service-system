import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Card, CardContent, List, Button, ListItem, Grid, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const VehicleDetails = () => {
  const { id } = useParams();
  const [issues, setIssues] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate(); // Hook for navigation

  const handleClick = () => {
    try {
      const vehicleData = {
        "total_cost": total,
        "vehicle": id,
      };
      const response = axios.post('http://localhost:8000/payments/', vehicleData);
      console.log('Vehicle registered:', response.data);
    } catch (error) {
      console.error('Error registering vehicle:', error);
    }
  };

  useEffect(() => {
    const fetchVehicleIssues = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/vehicles/${id}/issues/`);
        setIssues(response.data);
        const totalCostSum = response.data.reduce((sum, item) => {
          return sum + parseFloat(item.total_cost); // Convert total_cost to a float and sum it
        }, 0);
        setTotal(totalCostSum);
      } catch (error) {
        console.error('Error fetching vehicle issues:', error);
      }
    };
    fetchVehicleIssues();
  }, [id]);

  const handleBillDetails = (serviceId) => {
    navigate(`/bills/${serviceId}`); // Navigate to the service details page
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom align="center">
        Issues for Vehicle ID: {id}
      </Typography>
      <List>
        {issues.length > 0 ? (
          issues.map((issue) => (
            <Grid container spacing={2} key={issue.id} style={{ marginBottom: '15px' }}>
              <Grid item xs={12}>
                <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
                  <CardContent>
                    <Typography variant="h6">Issue #{issue.id}</Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Total Cost: ${issue.total_cost}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Components:
                    </Typography>
                    <Divider />
                    <List>
                      <ListItem key={issue.component.id} style={{ paddingLeft: '0' }}>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>{issue.component.name}</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">Price: ${issue.total_cost}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem style={{ paddingLeft: '0' }}>
                        <Typography>
                          Fix Type: {issue.is_repair ? 'Repaired' : 'Replaced'}
                        </Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>No issues found for this vehicle.</Typography>
        )}
        <Grid container spacing={2} style={{ marginBottom: '15px' }}>
          <Grid item xs={12}>
            <Card variant="outlined" style={{ backgroundColor: '#f5f5f5' }}>
              <CardContent>
                <ListItem key="total" style={{ paddingLeft: '0' }}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Total</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right" color='red'>Price: ${total}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Pay Button */}
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleClick} 
              fullWidth
            >
              Pay
            </Button>
          </Grid>
        </Grid>

        {/* View Bill Button */}
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBillDetails(issues.id)} // Redirect to service details page
              fullWidth
            >
              View Bill
            </Button>
          </Grid>
        </Grid>
      </List>
    </Paper>
  );
};

export default VehicleDetails;