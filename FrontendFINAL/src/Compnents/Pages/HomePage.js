import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from '../PageNavigation';
import PickupState from '../PickupState';
import PickupCity from '../PickupCity';
import DropState from '../DropState';
import DropCity from '../DropCity';
import PickupAirport from '../PickupAirport';
import DropAirport from '../DropAirport';
import carImage from '../../Images/vector.jpg'; // Update the image path
import '../../Style/Home.css'; 

export default function HomePage() {
  const [pickupDate, setPickupDate] = useState('');
  const [dropDate, setDropDate] = useState('');
  const navigate = useNavigate();

  const handleClickTo = () => {
    sessionStorage.setItem('pickupDate', pickupDate);
    sessionStorage.setItem('dropDate', dropDate);
    navigate('/PickupHubSelector'); // Navigate to PickupHubSelector component
  };

  const currentDatetime = new Date().toISOString().slice(0, 16);
  //sessionStorage.clear();

  return (
    <div className="home-container" >
        <Navbar/>
      <Container style={{marginTop:"10px"}}>
        <Row>
          <Col xs={5} className="pickup-column">
            <div className="date-picker">
              <Form.Group controlId="pickupDate">
                <Form.Label>Pickup Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={currentDatetime}
                />
              </Form.Group>
              <Form.Group controlId="dropDate">
                <Form.Label>Drop Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={dropDate}
                  onChange={(e) => setDropDate(e.target.value)}
                  min={currentDatetime}
                />
              </Form.Group>
            </div>
            <div className="pickup-section">
              <h3>Select Pickup Location</h3>
              <div className="location-section">
                <h5>Airport</h5>
                <PickupAirport />
                <h5>State</h5>
                <PickupState />
                <h5>City</h5>
                <PickupCity />
              </div>
            </div>
            <div className="drop-section">
              <h3>Select Drop Location</h3>
              <div className="location-section">
                <h5>Airport</h5>
                <DropAirport />
                <h5>State</h5>
                <DropState />
                <h5>City</h5>
                <DropCity />
              </div>
            </div>
            <Button onClick={handleClickTo} variant="primary" className="search-button">
              Search Hub
            </Button>
          </Col>

          <Col className="car-images-column">
            <div className="car-images-section">
              <img src={carImage} alt="Car" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}