// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { Box, Typography, Button, Paper, Divider, Stack, Chip, CircularProgress } from '@mui/material';
// import axios from 'axios';

// export default function BillingPage() {
//   const { billId } = useParams();
//   const [billingDetails, setBillingDetails] = useState(null);
//   const [isPaid, setIsPaid] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Fetch billing details on component mount
//   useEffect(() => {
//     const fetchBillingDetails = async () => {
//         console.log(billId)
//       try {
//         const response = await axios.get(`http://localhost:8000/bills/${billId}/`,{ headers: {
//             'Cache-Control': 'no-cache',  // Disable caching
//     'Pragma': 'no-cache',         // Disable caching for older HTTP/1.0 proxies
//     'Expires': '0',               // Expiry set to the past
//     'If-None-Match': '',          // Disable ETag handling
//     'If-Modified-Since': ''       // Disable Last-Modified header check
//           }});
//         setBillingDetails(response.data);
//         setIsPaid(response.data.status === 1); // Check if already paid
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching billing details:', error);
//         setLoading(false);
//       }
//     };

//     fetchBillingDetails();
//   }, [billId]);

//   // Handle payment action
//   const handlePayment = async () => {
//     try {
//       await axios.post(`http://localhost:8000/bills/${billId}/pay/`);
//       setIsPaid(true);
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (!billingDetails) {
//     return <Typography>Error fetching billing details. Please try again.</Typography>;
//   }

//   return (
//     <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
//       <Paper elevation={4} sx={{ p: 4, maxWidth: 600, width: '100%', borderRadius: 2 }}>
//         <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
//           Billing Details
//         </Typography>

//         <Divider sx={{ my: 2 }} />

//         <Stack spacing={2}>
//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">Bill ID:</Typography>
//             <Typography>{billingDetails.id}</Typography>
//           </Box>

//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">Service ID:</Typography>
//             <Typography>{billingDetails.service_details.id}</Typography>
//           </Box>

//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">Registration Number:</Typography>
//             <Typography>{billingDetails.service_details.registration_number}</Typography>
//           </Box>

//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">Service Status:</Typography>
//             <Chip
//               label={billingDetails.service_details.status}
//               color={
//                 billingDetails.service_details.status === 'Pending'
//                   ? 'warning'
//                   : billingDetails.service_details.status === 'Completed'
//                   ? 'success'
//                   : 'default'
//               }
//             />
//           </Box>

//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">Service Total Cost:</Typography>
//             <Typography>₹{billingDetails.service_details.total_cost}</Typography>
//           </Box>

//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">Bill Total Cost:</Typography>
//             <Typography>₹{billingDetails.total_cost}</Typography>
//           </Box>

//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">Payment Status:</Typography>
//             <Chip
//               label={isPaid ? 'Paid' : billingDetails.status_display}
//               color={isPaid ? 'success' : 'error'}
//             />
//           </Box>
//         </Stack>

//         <Divider sx={{ my: 3 }} />

//         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//           {!isPaid ? (
//             <Button variant="contained" color="primary" onClick={handlePayment} sx={{ borderRadius: 2 }}>
//               Pay Now
//             </Button>
//           ) : (
//             <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
//               Payment Completed
//             </Typography>
//           )}
//         </Box>
//       </Paper>
//     </Box>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// // Inside your component
// const BillDetails = () => {
//   const [bill, setBill] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [paymentProcessing, setPaymentProcessing] = useState(false);
//   const { billId } = useParams(); // billId will now contain the value from the URL

//   useEffect(() => {
//     // Fetch the bill details using the API
//     const fetchBillDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/bills/${billId}/`, 
//         );
//         setBill(response.data);
//       } catch (err) {
//         setError('Error fetching bill details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBillDetails();
//   }, [billId]);

//   // Handle the case where data is loading or there is an error
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Handle payment request
//   const handlePayment = async () => {
//     setPaymentProcessing(true);

//     try {
//       // POST request to initiate payment
//       const response = await axios.post(`http://localhost:8000/bills/${bill.id}/pay/`, {}, {
//         headers: {
//           'Authorization': 'Bearer YOUR_AUTH_TOKEN',  // Pass the authorization header if needed
//         },
//       });

//       if (response.status === 200) {
//         // Successfully paid, update the bill status
//         alert('Payment successful!');
//         setBill((prevBill) => ({ ...prevBill, is_paid: true }));
//       } else {
//         alert('Payment failed! Please try again.');
//       }
//     } catch (err) {
//       alert('Error processing payment.');
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   // Render the bill details
//   return (
//     <div>
//       <h1>Bill Details</h1>
//       <p><strong>Customer Name:</strong> {bill.customer_name}</p>
//       <p><strong>Amount Due:</strong> ₹{bill.amount_due}</p>
//       <p><strong>Due Date:</strong> {bill.due_date}</p>
//       <p><strong>Status:</strong> {bill.is_paid ? 'Paid' : 'Unpaid'}</p>

//       {/* Show pay button if the bill is unpaid and not already processing */}
//       {!bill.is_paid && !paymentProcessing && (
//         <button onClick={handlePayment} className="pay-button">
//           {paymentProcessing ? 'Processing...' : 'Pay Now'}
//         </button>
//       )}

//       {/* Disable button while payment is processing */}
//       {paymentProcessing && <p>Processing payment...</p>}
//     </div>
//   );
// };

// export default BillDetails;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { Box, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

// const BillDetails = () => {
//   const [bill, setBill] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [paymentProcessing, setPaymentProcessing] = useState(false);
//   const { billId } = useParams(); // billId will now contain the value from the URL

//   useEffect(() => {
//     // Fetch the bill details using the API
//     const fetchBillDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/bills/${billId}/`);
//         setBill(response.data);
//       } catch (err) {
//         setError('Error fetching bill details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBillDetails();
//   }, [billId]);

//   // Handle the case where data is loading or there is an error
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return <Typography variant="h6" color="error">{error}</Typography>;
//   }

//   // Handle payment request
//   const handlePayment = async () => {
//     setPaymentProcessing(true);

//     try {
//       const response = await axios.post(
//         `http://localhost:8000/bills/${bill.id}/pay/`,
//         {},
//         {
//           headers: {
//             'Authorization': 'Bearer YOUR_AUTH_TOKEN',  // Pass the authorization header if needed
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert('Payment successful!');
//         setBill((prevBill) => ({ ...prevBill, is_paid: true }));
//       } else {
//         alert('Payment failed! Please try again.');
//       }
//     } catch (err) {
//       alert('Error processing payment.');
//     } finally {
//       setPaymentProcessing(false);
//     }
//   };

//   // Render the bill details
//   return (
//     <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
//       <Card sx={{ width: 400, padding: 3 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>
//             Bill Details
//           </Typography>
          
//           {/* Bill Information */}
//           <Typography variant="body1" gutterBottom>
//             <strong>Vehicle Number:</strong> {bill.customer_name}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             <strong>Amount Due:</strong> ₹{bill.amount_due}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             <strong>Due Date:</strong> {new Date(bill.due_date).toLocaleDateString()}
//           </Typography>
//           <Typography variant="body1" gutterBottom>
//             <strong>Status:</strong> {bill.is_paid ? 'Paid' : 'Unpaid'}
//           </Typography>

//           {/* Payment Button */}
//           {!bill.is_paid && !paymentProcessing && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handlePayment}
//               fullWidth
//               disabled={paymentProcessing}
//               sx={{ marginTop: 2 }}
//             >
//               {paymentProcessing ? 'Processing...' : 'Pay Now'}
//             </Button>
//           )}

//           {/* Show processing message */}
//           {paymentProcessing && (
//             <Box display="flex" justifyContent="center" alignItems="center" paddingTop={2}>
//               <CircularProgress size={24} />
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default BillDetails;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Button, CircularProgress, Divider } from '@mui/material';

const BillDetails = () => {
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const { billId } = useParams(); // billId will now contain the value from the URL

  useEffect(() => {
    // Fetch the bill details using the API
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/bills/${billId}/`);
        setBill(response.data);
      } catch (err) {
        setError('Error fetching bill details');
      } finally {
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, [billId]);

  // Handle the case where data is loading or there is an error
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  // Handle payment request
  const handlePayment = async () => {
    setPaymentProcessing(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/bills/${bill.id}/pay/`,
        {},
        
      );

      if (response.status === 200) {
        alert('Payment successful!');
        setBill((prevBill) => ({ ...prevBill, is_paid: true }));
      } else {
        alert('Payment failed! Please try again.');
      }
    } catch (err) {
      alert('Error processing payment.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Render the bill details
  return (
    <Box display="flex" justifyContent="center" alignItems="center" padding={2}>
      <Card sx={{ width: 450, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center" color="primary">
            Bill Details
          </Typography>
          
          {/* Bill Information */}
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Registration Number:</strong> {bill.service_details?.registration_number || 'N/A'}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Amount Due:</strong> ₹{bill.total_cost || 'N/A'}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Due Date:</strong> {new Date(bill.date).toLocaleDateString() || 'N/A'}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Status:</strong> <span style={{ color: bill.status_display === 'Not Paid' ? 'red' : 'green' }}>{bill.status_display || 'N/A'}</span>
          </Typography>
          
          
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Service Status:</strong> {bill.service_details?.status || 'N/A'}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            <strong>Total Service Cost:</strong> ₹{bill.service_details?.total_cost || 'N/A'}
          </Typography>
          {/* Service Details Section */}
          <Divider sx={{ marginY: 2 }} />
          

          {/* Payment Button */}
          {!bill.is_paid && !paymentProcessing && (
            <Button
              variant="contained"
              color="primary"
              onClick={handlePayment}
              fullWidth
              disabled={paymentProcessing}
              sx={{ marginTop: 2 }}
            >
              {paymentProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
          )}

          {/* Show processing message */}
          {paymentProcessing && (
            <Box display="flex" justifyContent="center" alignItems="center" paddingTop={2}>
              <CircularProgress size={24} />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BillDetails;