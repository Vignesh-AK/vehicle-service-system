import React, { useState } from 'react';
import axios from 'axios';

function ComponentForm() {
  const [name, setName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [repairPrice, setRepairPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, new_price: newPrice, repair_price: repairPrice };
    await axios.post('http://localhost:8000/components/', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Component Name" />
      <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="New Price" />
      <input value={repairPrice} onChange={(e) => setRepairPrice(e.target.value)} placeholder="Repair Price" />
      <button type="submit">Add Component</button>
    </form>
  );
}

export default ComponentForm;