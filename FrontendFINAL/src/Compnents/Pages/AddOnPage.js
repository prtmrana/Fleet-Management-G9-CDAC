import React, { useState, useEffect } from 'react';
import Navbar from '../PageNavigation';
import { useNavigate } from 'react-router-dom';
import '../../Style/addonpage.css';

function AddOnPage() {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const navigate = useNavigate();

  const addons = [
    { id: 1, name: 'GPS Navigation', price: 100 },
    { id: 2, name: 'Child Seat', price: 100 },
    { id: 3, name: 'Wi-Fi Hotspot', price: 100 },
    // Add more add-ons here
  ];

  useEffect(() => {
    // Store the number of selected addons in localStorage
    localStorage.setItem('numberOfAddonsSelected', selectedAddOns.length);
  }, [selectedAddOns]);

  const handleAddOnToggle = (addonId) => {
    if (selectedAddOns.includes(addonId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addonId));
    } else {








      
      setSelectedAddOns([...selectedAddOns, addonId]);
    }
  };

  const handleContinue = () => {
    // Store selected addons in sessionStorage
    selectedAddOns.forEach(addonId => {
      const addon = addons.find(addon => addon.id === addonId);
      if (addon) {
        localStorage.setItem(`addOnId${addonId}`, addon.id);
        localStorage.setItem(`addonName${addonId}`, addon.name);
        localStorage.setItem(`addonPrice${addonId}`, addon.price);
      }
    });

    navigate('/filluserdetails');
  };

  return (
    <section>
      <Navbar />
      <div className="add-on-page">
        <h1>Add-Ons</h1>
        <table className="add-ons-table">
          <thead>
            <tr>
              <th>Add-On</th>
              <th>Price</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {addons.map(addon => (
              <tr key={addon.id}>
                <td>{addon.name}</td>
                <td>${addon.price}</td>
                <td>
                  <input
                    type="checkbox"
                    onClick={() => handleAddOnToggle(addon.id)}
                    checked={selectedAddOns.includes(addon.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="selected-addons">
          <h2>Selected Add-Ons:</h2>
          <ul>
            {selectedAddOns.map(selectedId => {
              const selectedAddon = addons.find(addon => addon.id === selectedId);
              return (
                <li key={selectedId}>
                  {selectedAddon.name} - ${selectedAddon.price}
                </li>
              );
            })}
          </ul>
        </div>
        <button className="continue" onClick={handleContinue}>Continue</button>
      </div>
    </section>
  );
}

export default AddOnPage;
