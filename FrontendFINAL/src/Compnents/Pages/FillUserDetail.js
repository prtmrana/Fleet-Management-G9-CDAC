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

function FillUserDetail() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("isUserLoggedIn") ?
    sessionStorage.getItem("isUserLoggedIn") : false);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [firstName, setFirstName] = useState(
    sessionStorage.getItem("firstName") ? sessionStorage.getItem("firstName") : '');
  const [lastName, setLastName] = useState(
    sessionStorage.getItem("lastName") ? sessionStorage.getItem("lastName") : ''
  );
  const [mobileNumber, setMobileNumber] = useState(
    sessionStorage.getItem("mobileNumber") ? sessionStorage.getItem("mobileNumber") : ''
  );
  const [address, setAddress] = useState(
    sessionStorage.getItem("address") ? sessionStorage.getItem("address") : ''
  );
  const [emailId, setEmailId] = useState(
    sessionStorage.getItem("emailId") ? sessionStorage.getItem("emailId") : ''
  );
  const [dlNo, setDlNo] = useState(
    sessionStorage.getItem("dlNo") ? sessionStorage.getItem("dlNo") : ''
  );
  const [aadharNo, setAadharNo] = useState(
    sessionStorage.getItem("aadharNo") ? sessionStorage.getItem("aadharNo") : ''
  );
  const [passportNo, setPassportNo] = useState(
    sessionStorage.getItem("passportNo") ? sessionStorage.getItem("passportNo") : ''
  );
  const [cityName, setCityName] = useState(
    sessionStorage.getItem("userCityName") ? sessionStorage.getItem("userCityName") : ''
  );
  const [cityId, setCityId] = useState(
    sessionStorage.getItem("userCityId") ? sessionStorage.getItem("userCityId") : ''
  );
  const [stateName, setStateName] = useState(
    sessionStorage.getItem("userStateName") ? sessionStorage.getItem("userStateName") : ''
  );
  const [stateId, setStateId] = useState(
    sessionStorage.getItem("userStateId") ? sessionStorage.getItem("userStateId") : ''
  );


  const signIn = (e) => {
    e.preventDefault();
    console.log("A");
    fetch(`http://localhost:8080/api/user/${email}/${password}`)
      .then(response => response.json())
      .then(result => {
        sessionStorage.setItem("isUserLoggedIn", true);
        setUserData(result);
        sessionStorage.setItem("userId", result.userId);

        setFirstName(result.firstName);
        sessionStorage.setItem("firstName", result.firstName);

        setLastName(result.lastName);
        sessionStorage.setItem("lastName", result.lastName);

        setMobileNumber(result.mobileNumber);
        sessionStorage.setItem("mobileNumber", result.mobileNumber);

        setAddress(result.address);
        sessionStorage.setItem("address", result.address);

        setEmailId(result.emailId);
        sessionStorage.setItem("emailId", result.emailId);

        setDlNo(result.dlNo);
        sessionStorage.setItem("dlNo", result.dlNo);

        setAadharNo(result.aadharNo);
        sessionStorage.setItem("aadharNo", result.aadharNo);

        setPassportNo(result.passportNo);
        sessionStorage.setItem("passportNo", result.passportNo);

        setCityName(result.city.cityName);
        sessionStorage.setItem("userCityName", result.city.cityName);

        setCityId(result.city.cityId);
        sessionStorage.setItem("userCityId", result.city.cityId);

        setStateName(result.state.stateName);
        sessionStorage.setItem("userStateName", result.state.stateName);

        setStateId(result.state.stateId);
        sessionStorage.setItem("userStateId", result.state.stateId);


        console.log(result);
      })
      .then(setIsLoggedIn(true))
      .catch(() => { console.log("Failed to fetch data"); navigate("errorpage") });


  }

  // const [tempData, setTempData] = useState({}); 



  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempData = {
      "firstName": firstName ? firstName : '',
      "lastName": lastName ? lastName : '',
      "mobileNumber": mobileNumber ? mobileNumber : '',
      "emailId": emailId ? emailId : '',
      "dlNo": dlNo ? dlNo : '',
      "address": address ? address : '',
      "aadharNo": aadharNo ? aadharNo : '',
      "passportNo": passportNo ? passportNo : '',
      "state": {
        "stateId": stateId
      },
      "city": {
        "cityId": cityId
      }
    }

    console.log(tempData);

    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("mobileNumber", mobileNumber);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("emailId", emailId);
    sessionStorage.setItem("dlNo", dlNo);
    sessionStorage.setItem("aadharNo", aadharNo);
    sessionStorage.setItem("passportNo", passportNo);
    sessionStorage.setItem("userCityName", cityName);
    sessionStorage.setItem("userCityId", cityId);
    sessionStorage.setItem("userStateName", stateName);
    sessionStorage.setItem("userStateId", stateId);



    if (isLoggedIn == false) { // then only POST in user table 

    
    }

    navigate("/booking");
  }

  console.log(isLoggedIn);


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
          <Col xs={3} style={columnStyle}>
            Login area
            <Form onSubmit={signIn}>
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="Enter email" onChange={(event) => { setEmail(event.target.value) }} />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" onChange={(event) => { setPassword(event.target.value) }} />
              </FloatingLabel>
              <br />

              <Button variant="primary" type="submit">Login</Button>
            </Form>
          </Col>

          <Col style={columnStyle}>
            User details area
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} disabled={isLoggedIn} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={(event) => { setLastName(event.target.value) }} disabled={isLoggedIn}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridMobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Mobile Number" value={mobileNumber} onChange={(event) => { setMobileNumber(event.target.value) }} disabled={isLoggedIn}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(event) => { setAddress(event.target.value) }} disabled={isLoggedIn}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter Email" value={emailId} onChange={(event) => { setEmailId(event.target.value) }} disabled={isLoggedIn}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDLNo">
                  <Form.Label>Driver's License No</Form.Label>
                  <Form.Control type="text" placeholder="Enter DL No" value={dlNo} onChange={(event) => { setDlNo(event.target.value) }} disabled={isLoggedIn}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridAadharNo">
                  <Form.Label>Aadhar No</Form.Label>
                  <Form.Control type="text" placeholder="Enter Aadhar No" value={aadharNo} onChange={(event) => { setAadharNo(event.target.value) }} disabled={isLoggedIn}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassportNo">
                  <Form.Label>Passport No</Form.Label>
                  <Form.Control type="text" placeholder="Enter Passport No" value={passportNo} onChange={(event) => { setPassportNo(event.target.value) }} disabled={isLoggedIn}/>
                </Form.Group>
              </Row>

              <Row className="mb-3">

                {isLoggedIn ?
                  <>
                    <Form.Group as={Col} controlId="formGridCityName">
                      <Form.Label>City Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter City Name" value={cityName} onChange={(event) => { setCityName(event.target.value) }} disabled={isLoggedIn}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridStateName">
                      <Form.Label>State Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter State Name" value={stateName} onChange={(event) => { setStateName(event.target.value) }} disabled={isLoggedIn}/>
                    </Form.Group> </>
                  :
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

export default FillUserDetail;