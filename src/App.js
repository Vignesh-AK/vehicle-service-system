import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';
// import VehicleForm from './components/VehicleForm';
import VehicleDetails from './components/VehicleDetails';
import ComponentsPage from './components/ComponentsPage';
import Graphs from './components/Graphs';
// import VehicleList from './components/VehicleList'; // New component for listing vehicles
import AddVehicleModel from './components/AddVehicleModel'; // New component for listing vehicles
import BillingPage from './components/BillingPage';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';
import ServiceDetails from './components/ServiceDetails';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Vehicle Service System</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/vehicles">Add Vehicle</Button>
          <Button color="inherit" component={Link} to="/components">Component</Button>
          <Button color="inherit" component={Link} to="/revenue">Revenue</Button>
          <Button color="inherit" component={Link} to="/service">Service</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<ServiceList />} /> {/* Home page displaying the list of vehicles */}
          <Route path="/vehicles" element={<AddVehicleModel />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />   
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/revenue" element={<Graphs/>} />
          <Route path="/service" element={<ServiceForm />} />
          <Route path="/bills/:billId" element={<BillingPage />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;