import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComponentForm() {
  const [name, setName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [repairPrice, setRepairPrice] = useState('');
  const [vehicles, setVehicles] = useState([]); // State for vehicles list
  const [selectedVehicle, setSelectedVehicle] = useState(''); // State for selected vehicle

  // Fetch vehicle list on component mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/vehicles/');
        console.log('Vehicle Data:', response.data); // Debug here

        setVehicles(response.data);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { 
      name, 
      new_price: newPrice, 
      repair_price: repairPrice, 
      vehicle_id: selectedVehicle 
    };

    try {
      await axios.post('http://localhost:8000/components/', data);
      alert('Component added successfully');
    } catch (error) {
      console.error('Error adding component:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Component Name" 
      />
      <input 
        value={newPrice} 
        onChange={(e) => setNewPrice(e.target.value)} 
        placeholder="New Price" 
      />
      <input 
        value={repairPrice} 
        onChange={(e) => setRepairPrice(e.target.value)} 
        placeholder="Repair Price" 
      />
      <select 
        value={selectedVehicle} 
        onChange={(e) => setSelectedVehicle(e.target.value)}
      >
        <option value="">Select Vehicle</option>
        {vehicles.map((vehicle) => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.make} {vehicle.model}
          </option>
        ))}
      </select>
      <button type="submit">Add Component</button>
    </form>
  );
}

export default ComponentForm;