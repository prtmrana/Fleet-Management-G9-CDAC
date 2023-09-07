import React from 'react';
import Navbar from '../PageNavigation';
import '../../Style/SuccessPage.css';

function SuccessPage() {
  return (
    <>
      <Navbar />
      <div className='confirmation-page-container'>
        <div className='confirmation-card'>
          <h1 className='confirmation-header'>Your Booking Is Confirmed</h1>
          <p>Thank you for booking with us!</p>
        </div>
      </div>
    </>


  );
}

export default SuccessPage; 
