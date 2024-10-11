import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IssueForm() {
  const [vehicles, setVehicles] = useState([]);
  const [components, setComponents] = useState([]);
  const [vehicleId, setVehicleId] = useState('');
  const [componentId, setComponentId] = useState('');
  const [isRepair, setIsRepair] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const vehiclesRes = await axios.get('http://localhost:8000/vehicles/');
      setVehicles(vehiclesRes.data);
      const componentsRes = await axios.get('http://localhost:8000/components/');
      setComponents(componentsRes.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { vehicle: vehicleId, component: componentId, is_repair: isRepair };
    await axios.post('http://localhost:8000/issues/', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setVehicleId(e.target.value)}>
        {vehicles.map(v => <option key={v.id} value={v.id}>{v.make} {v.model}</option>)}
      </select>
      <select onChange={(e) => setComponentId(e.target.value)}>
        {components.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <label>
        <input type="radio" checked={isRepair} onChange={() => setIsRepair(true)} /> Repair
      </label>
      <label>
        <input type="radio" checked={!isRepair} onChange={() => setIsRepair(false)} /> New
      </label>
      <button type="submit">Add Issue</button>
    </form>
  );
}

export default IssueForm;