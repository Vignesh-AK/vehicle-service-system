import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
import VehicleForm from './components/VehicleForm';
import VehicleDetails from './components/VehicleDetails';
import PaymentPage from './components/PaymentPage';
import Graphs from './components/Graphs';
import VehicleList from './components/VehicleList'; // New component for listing vehicles

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Vehicle Service System</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/vehicles">Add Vehicle</Button>
          <Button color="inherit" component={Link} to="/pricing">Component</Button>
          <Button color="inherit" component={Link} to="/revenue">Revenue</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<VehicleList />} /> {/* Home page displaying the list of vehicles */}
          <Route path="/vehicles" element={<VehicleForm />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} /> 
          <Route path="/pricing" element={<PaymentPage />} />
          <Route path="/revenue" element={<Graphs />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;