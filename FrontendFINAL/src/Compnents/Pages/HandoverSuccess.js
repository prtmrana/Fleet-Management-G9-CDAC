import React from 'react';
import Navbar from '../PageNavigation';
import '../../Style/SuccessPage.css';

// Import your jpg image
import successImage from '../../Images/Handover.jpg';
function HandoverSuccess() {
  return (
    <>
      <Navbar />
      <div className='confirmation-page-container'>
        <div className='confirmation-card'>
          {/* Add the <img> element with your image */}
          <img src={successImage} alt="Success" className="success-image" />

          {/* Add a heading and any other content as needed */}
          <h1 className='confirmation-header'>Car handed successfully!</h1>
          <p>Your success message or additional content here.</p>
        </div>
      </div>
    </>
  );
}

export default HandoverSuccess;
