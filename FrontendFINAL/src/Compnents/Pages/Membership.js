import React, { useState } from 'react';
import Navbar from "../PageNavigation";
import { useNavigate } from 'react-router-dom';
import '../../Style/FillUserDetail.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Membership() {
  // const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isUserLoggedIn") ?
  //   sessionStorage.getItem("isUserLoggedIn") : false);


  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [emailId, setEmailId] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dlNo, setDlNo] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [passportNo, setPassportNo] = useState('');
  const [cityName, setCityName] = useState('');
  const [cityId, setCityId] = useState('');
  const [stateName, setStateName] = useState('');
  const [stateId, setStateId] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [rePassword, setRePassword] = useState('');




  // const [tempData, setTempData] = useState({}); 



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const tempData = {
  //     "firstName": firstName ? firstName : '',
  //     "lastName": lastName ? lastName : '',
  //     "mobileNumber": mobileNumber ? mobileNumber : '',
  //     "emailId": emailId ? emailId : '',
  //     "dlNo": dlNo ? dlNo : '',
  //     "address": address ? address : '',
  //     "aadharNo": aadharNo ? aadharNo : '',
  //     "passportNo": passportNo ? passportNo : '',
  //     "state": {
  //       "stateId": stateId
  //     },
  //     "city": {
  //       "cityId": cityId
  //     }
  //   }

  //   console.log(tempData);

  //   sessionStorage.setItem("firstName", firstName);
  //   sessionStorage.setItem("lastName", lastName);
  //   sessionStorage.setItem("mobileNumber", mobileNumber);
  //   sessionStorage.setItem("address", address);
  //   sessionStorage.setItem("emailId", emailId);
  //   sessionStorage.setItem("dlNo", dlNo);
  //   sessionStorage.setItem("aadharNo", aadharNo);
  //   sessionStorage.setItem("passportNo", passportNo);
  //   sessionStorage.setItem("userCityName", cityName);
  //   sessionStorage.setItem("userCityId", cityId);
  //   sessionStorage.setItem("userStateName", stateName);
  //   sessionStorage.setItem("userStateId", stateId);
  //   // navigate("/booking");
  // } 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (password !== rePassword) {
      setPasswordMatchError(true);
      return;
    } else {
      setPasswordMatchError(false);
    }

    // Rest of your code...

    const tempData = {
      "firstName": firstName,
      "lastName": lastName,
      "mobileNumber": mobileNumber,
      "emailId": emailId,
      "address": address,
      "password": password,
      "dlNo": dlNo,
      "aadharNo": aadharNo,
      "passportNo": passportNo,
      "isEmployee": 0, // or 1 for employee
      "state": {
        "stateId": stateId // Replace with the actual state ID
      },
      "city": {
        "cityId": cityId // Replace with the actual city ID
      }
    };

    try {
      const response = await fetch('http://localhost:8080/api/user/add', {
        method: 'POST',
        body: JSON.stringify(tempData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        console.log("User successfully added.");
        // You can navigate to the success page here if needed.
        navigate("/memberregisteredsuccess"); 
      } else {
        // Handle the error scenario
        console.log("Error while adding user.");

        // You can get the error response text for more details
        const errorText = await response.text();
        console.error("Error Response:", errorText);

        // If the error response is in JSON format, you can parse it
        // const errorJson = await response.json();
        // console.error("Error Response:", errorJson);

        // Depending on the actual API response format, handle the error appropriately.
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      console.error("Network Error:", error);
      // Add more specific error handling as needed.
    }

  }


  const onChangeHandlerState = (event) => {
    let tempId = event.target.value;
    setStateId(tempId);
    sessionStorage.setItem("userStateId", tempId);
  }
  const handelClickState = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/states");
      const result = await response.json();
      setStateList(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      // yaha pe use navigate use karke Error page pe send karo 
    }
  }


  const onChangeHandlerCity = (event) => {
    let tempId = event.target.value;
    setCityId(tempId);
    sessionStorage.setItem("userCityId", tempId);
  }

  const handelClickCity = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/cities/" + sessionStorage.getItem("userStateId"));
      const result = await response.json();
      setCityList(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      // yaha pe use navigate use karke Error page pe send karo 
    }
  }





  // console.log(email);
  // console.log(password);
  console.log(stateId);
  console.log(cityId);


  const columnStyle = {
    border: '1px solid gray',
    backgroundColor: 'lightgray',
  };

  return (
    <div>
      <Navbar />
      <h3 className='welcome-message'>Enter your details</h3>
      <Container>
        <Row>


          <Col style={columnStyle}>
            User details area
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter Email" value={emailId} onChange={(event) => { setEmailId(event.target.value) }} />
                </Form.Group>

                {/* <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="text" placeholder="Enter Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </Form.Group> */}
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={(event) => { setLastName(event.target.value) }} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Mobile Number" value={mobileNumber} onChange={(event) => { setMobileNumber(event.target.value) }} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(event) => { setAddress(event.target.value) }} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAadharNo">
                  <Form.Label>Aadhar No</Form.Label>
                  <Form.Control type="text" placeholder="Enter Aadhar No" value={aadharNo} onChange={(event) => { setAadharNo(event.target.value) }} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassportNo">
                  <Form.Label>Passport No</Form.Label>
                  <Form.Control type="text" placeholder="Enter Passport No" value={passportNo} onChange={(event) => { setPassportNo(event.target.value) }} />
                </Form.Group>
              </Row>

              <Row className="mb-3">

                <Form.Group as={Col} controlId="formGridDLNo">
                  <Form.Label>Driver's License No</Form.Label>
                  <Form.Control type="text" placeholder="Enter DL No" value={dlNo} onChange={(event) => { setDlNo(event.target.value) }} />
                </Form.Group>
              </Row>

              <Row className="mb-3">

                {
                  <>
                    <Form.Select aria-label="Select State" onChange={onChangeHandlerState} onClick={handelClickState} >
                      <option> Select State</option>
                      {stateList.map(state => (
                        <option key={state.stateId} value={state.stateId} >
                          {state.stateName}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Select aria-label="Select City" onChange={onChangeHandlerCity} onClick={handelClickCity} >
                      <option> Select City</option>
                      {cityList.map(city => (
                        <option key={city.cityId} value={city.cityId}>
                          {city.cityName}
                        </option>
                      ))}
                    </Form.Select>
                  </>

                }

              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridRePassword">
                  <Form.Label>Re-enter Password</Form.Label>
                  <Form.Control type="password" placeholder="Re-enter Password" value={rePassword} onChange={(event) => { setRePassword(event.target.value) }} />
                </Form.Group>

                {/* Display error message if passwords don't match */}
                {passwordMatchError && (
                  <div className="text-danger">Passwords do not match.</div>
                )}
              </Row>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Membership;