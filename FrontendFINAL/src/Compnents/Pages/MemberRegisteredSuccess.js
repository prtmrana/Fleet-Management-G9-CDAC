import React from 'react';
import Navbar from "../PageNavigation";
import '../../Style/SuccessPage.css';
import Footer from '../Footer';

function MemberRegisteredSuccess() {
  return (
    <>
      <Navbar />
      <div className='confirmation-page-container'>
        <div className='confirmation-card'>
          <h1 className='confirmation-header'>You are registerd with us !</h1>
        </div>
      </div>
      <Footer/>
    </> 


  );
}

export default MemberRegisteredSuccess;