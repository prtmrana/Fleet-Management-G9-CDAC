import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './Compnents/Pages/HomePage';
import AboutUs from './Compnents/Pages/AboutUs';
import ContactUs from './Compnents/Pages/ContactUs'; 
import ErrorPage from './Compnents/Pages/ErrorPage'; 
import PickupHubSelector from './Compnents/Pages/PickupHubSelector';
import DropHubSelector from './Compnents/Pages/DropHubSelector';
import RegistrationForm from './Compnents/Pages/FillUserDetail';
import Booking from './Compnents/Pages/Booking'; 
import CategorySelector from './Compnents/Pages/CategorySelector'; 
import AddOnPage from './Compnents/Pages/AddOnPage'; 
import Membership from './Compnents/Pages/Membership'; 
import SuccessPage from './Compnents/Pages/SuccessPage'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import FillUserDetail from './Compnents/Pages/FillUserDetail'; 
import UserLogin from './Compnents/Pages/UserLogin'; 
import EmployeeLogin from './Compnents/Pages/EmployeeLogin';
import Handover from './Compnents/Pages/Handover';
import Return from './Compnents/Pages/Return'; 
import HandoverSuccess from './Compnents/Pages/HandoverSuccess'; 
import Invoice from './Compnents/Pages/Invoice';
import MemberRegisteredSuccess from './Compnents/Pages/MemberRegisteredSuccess';
import ModifyCancelBooking from './Compnents/Pages/ModifyCancelBooking';


function App() {

  return (
    <BrowserRouter> 
    


      <Routes> 
        
          <Route path='/' element={<HomePage />} />
          <Route path='PickupHubSelector' element={<PickupHubSelector />} /> 
          <Route path='DropHubSelector' element={<DropHubSelector />} /> 
          <Route path='categoryselector' element={<CategorySelector />} /> 
          <Route path='addonpage' element={<AddOnPage />} /> 
          <Route path='filluserdetails' element={<FillUserDetail />} />  
          <Route path='userlogin' element={<UserLogin />} /> 
          <Route path='employeelogin' element={<EmployeeLogin />} /> 
          <Route path='handover' element={<Handover />} /> 
          <Route path='handoversuccess' element={<HandoverSuccess />} /> 
          <Route path='return' element={<Return />} /> 
          <Route path='membership' element={<Membership />} /> 
          <Route path='registrationform' element={<RegistrationForm />} /> 
          <Route path='booking' element={<Booking  />} /> 
          <Route path='successpage' element={<SuccessPage />} /> 

          <Route path='returnsuccess' element={<returnsuccess />} /> 
          <Route path='inovice' element={<Invoice />} /> 
          <Route path='Modify' element={<ModifyCancelBooking />} /> 
          <Route path='memberregisteredsuccess' element={<MemberRegisteredSuccess />} /> 

          
          <Route path='about' element={<AboutUs/>} /> 
          <Route path='contact' element={<ContactUs/>} /> 
       
              
          <Route path='*' element={<ErrorPage/>} /> 
      </Routes> 

    </BrowserRouter>
  );
}

export default App;