import React from 'react';
import Navbar from "../PageNavigation";
import '../../Style/Booking.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function BookingPage() {
  const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(sessionStorage.getItem('lastName') || '');
  const [mobileNumber, setMobileNumber] = useState(sessionStorage.getItem('mobileNumber') || '');
  const [address, setAddress] = useState(sessionStorage.getItem('address') || '');
  const [emailId, setEmailId] = useState(sessionStorage.getItem('emailId') || '');
  const [dlNo, setDlNo] = useState(sessionStorage.getItem('dlNo') || '');
  const [aadharNo, setAadharNo] = useState(sessionStorage.getItem('aadharNo') || '');
  const [passportNo, setPassportNo] = useState(sessionStorage.getItem('passportNo') || '');
  const [cityName, setCityName] = useState(sessionStorage.getItem('userCityName') || '');
  const [cityId, setCityId] = useState(sessionStorage.getItem('userCityId') || '');
  const [stateName, setStateName] = useState(sessionStorage.getItem('userStateName') || '');
  const [stateId, setStateId] = useState(sessionStorage.getItem('userStateId') || ''); 
  // const [userId, setUserId] = useState(); 

  let pickcategoryName = sessionStorage.getItem('pickcategoryName');
  let pickuphubName = sessionStorage.getItem('pickupHubName');
  let dropHubName = sessionStorage.getItem('dropHubName');

  const navigate = useNavigate();


  const handleCancel = () => {
    navigate("/");
  };

  const handleConfirm = async () => {
    console.log("helloEmail-> " + emailId);

    try { 
      const currentDate = new Date(); // 2023-09-22T15:30:00 // 2023-8-30T8:22:23
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding leading zero
      const day = String(currentDate.getDate()).padStart(2, '0'); // Adding leading zero
      const hours = String(currentDate.getHours()).padStart(2, '0'); // Adding leading zero
      const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Adding leading zero
      const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Adding leading zero 

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      console.log(formattedDate);


      const response = await fetch(`http://localhost:8080/api/user/${emailId}`);
      const result = await response.json();
      const userId = await result.userId; 


      // console.log("helloInside-> " + result.userId);
      sessionStorage.setItem("userId", result.userId);

      console.log("hello-> " + userId); 

      const tempData = {
        "bookingDateAndTime": formattedDate,
        "startDate": sessionStorage.getItem("pickupDate") == undefined ? 0 : sessionStorage.getItem("pickupDate"),
        "endDate": sessionStorage.getItem("dropDate") == undefined ? 0 : sessionStorage.getItem("dropDate"), 
        "firstName": firstName,
        "lastName": lastName,
        "mobileNumber": mobileNumber,
        "emailId": emailId,
        "dLNumber": dlNo,
        "aadharNo": aadharNo,
        "passportNo": passportNo,
        "userId": userId, 
        "state": {
          "stateId": stateId
        },
        "city": {
          "cityId": cityId
        }, 
        "pickupHubId": sessionStorage.getItem("pickupHubId") == undefined ? 0 : sessionStorage.getItem("pickupHubId"),
        "dropHubId": sessionStorage.getItem("dropHubId") == undefined ? 0 : sessionStorage.getItem("dropHubId"),
        "category": {
          "categoryId": sessionStorage.getItem("pickCategoryId") == undefined ? 0 : sessionStorage.getItem("pickCategoryId")
        }
      };

      // console.log("--> TempData");
      // console.log(tempData);

      // Now post in Booking table
      const bookingResponse = await fetch('http://localhost:8080/api/addbooking', {
        method: 'POST',
        body: JSON.stringify(tempData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (bookingResponse.ok) {
        console.log("Booking successfully added.");
        localStorage.clear(); 
        navigate("/successpage"); 
      } else {
        console.log("Error while adding booking.");
        // Handle the error scenario
      }
    } catch (error) {
      console.error("--> Error:", error);
      // Handle the error scenario
    }
  };







  return (
    <> 
     <Navbar />
    <div className='booking-page-container'>
     
      <h3 className='booking-header'>Booking Review</h3>
      <div className='booking-card'>
        <div className='booking-card-header'>Booking Information</div>

        <div className='booking-card-body'>
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Email:</strong> {emailId}</p>
          <p><strong>Mobile Number:</strong> {mobileNumber}</p>

          <p><strong>Pickup hub name:</strong> {pickuphubName}</p>
          <p><strong>Drop hub name:</strong> {dropHubName}</p>

          <p><strong>Selected Car Category:</strong> {pickcategoryName}</p>
        </div>
      </div>

      <div className='booking-card'>
        <div className='booking-card-body'>
          <button className='booking-confirm-button' onClick={handleConfirm}>Confirm</button>
          
          <button className='booking-cancel-button' onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default BookingPage; 