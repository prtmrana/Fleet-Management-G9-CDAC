import Navbar from "../PageNavigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

function HandOver() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userEmailId, setUserEmailId] = useState('');
    const [booking, setBooking] = useState(null);
    const [carList, setCarList] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState();
    const [emailNotFound, setEmailNotFound] = useState(false);

    const navigate = useNavigate();


    const fetchBookingByEmailId = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/booking/by-email/${userEmailId}`);
            if (response.status === 404) {
                // Email not found, set emailNotFound to true
                setEmailNotFound(true);
                setBooking(null); // Clear booking data
                setCarList([]); // Clear car list
                return;
            }
    
            const result = await response.json();
            setBooking(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleCar = async () => {
        try {
            console.log("yaha aaya");
            const response = await fetch(`http://localhost:8080/api/cars/${booking.pickupHubId}/${booking.category.categoryId}`);
            const result = await response.json();
            setCarList(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const handleCarSelection = (selectedCar) => {
        // Perform your desired task using the selected car
        console.log("Selected car:", selectedCar);
        setSelectedCarId(selectedCar.carId);
        sessionStorage.setItem("selectedCarId", selectedCar.carId);
        // Add your logic here
    };

    const handleHandover = async () => {
        // POST data in billing table 

        try {
            const billingData = {
                staffName: sessionStorage.getItem("employeeName"),
                userName: booking.firstName + " " + booking.lastName,
                userEmailId: booking.emailId,
                customerMobileNo: booking.mobileNumber,
                customerAadharNo: booking.aadharNo,
                customerPassNo: booking.passportNo,
                billAmount: 0.0,
                fuelStatus: "full",
                startDate: booking.startDate,
                endDate: booking.endDate,
                categoryId: booking.category.categoryId,
                car: {
                    carId: sessionStorage.getItem("selectedCarId")
                },
                booking: {
                    bookingId: booking.bookingId
                },
                pickupHub: {
                    hubId: booking.pickupHubId
                },
                dropHub: {
                    hubId: booking.dropHubId
                }
            };

            const response = await fetch('http://localhost:8080/api/addbilling', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(billingData)
            });

            if (response.ok) {
                console.log('Billing record created successfully.');
                // Perform any additional actions after successful creation
                navigate("/handoversuccess")
            } else {
                console.error('Failed to create billing record.');
            }
        } catch (error) {
            console.error('Error creating billing record:', error);
        }

    }

    const renderHandover = (
        <section>
            <Button variant="primary" onClick={handleHandover}>
                Handover
            </Button>
        </section>
    );



    return (
        <>
            <Navbar />
            <Container>

                <div>
                    <div className="booking-details-container">
                        <h3>Booking Details</h3>
                        <div className="input-fields">
                            <input
                                type="text"
                                placeholder="Enter Email ID"
                                value={userEmailId}
                                onChange={(e) => setUserEmailId(e.target.value)}
                            />
                            <Button style={{ marginLeft: "15px" }} variant="primary" onClick={fetchBookingByEmailId}>
                                Get Details
                            </Button>
                        </div>
                        {emailNotFound && (
                            <div className="email-not-found-message">
                                Email not found. Please check the email ID.
                            </div>
                        )}

                        {booking && (
                            <div className="booking-table">
                                <Table striped bordered>
                                    <tbody>
                                        <tr>
                                            <td><strong>Booking ID:</strong></td>
                                            <td>{booking.bookingId}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Aadhar No:</strong></td>
                                            <td>{booking.aadharNo}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Booking Date and Time:</strong></td>
                                            <td>{booking.bookingDateAndTime}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>First Name:</strong></td>
                                            <td>{booking.firstName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Last Name:</strong></td>
                                            <td>{booking.lastName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Driving License number:</strong></td>
                                            <td>{booking.dLNumber}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Pickup Date:</strong></td>
                                            <td>{booking.startDate}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Drop Date:</strong></td>
                                            <td>{booking.endDate}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Category Name:</strong></td>
                                            <td>{booking.category.categoryName}</td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <Button variant="primary" onClick={handleCar}>
                                    Assign Car
                                </Button>

                                {carList.length > 0 && (
                                    <div className="car-list">
                                        <h4>Available Cars:</h4>
                                        <Table striped bordered>
                                            <thead>
                                                <tr>
                                                    <th>Car Name</th>
                                                    <th>Car Numberplate</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {carList.map(car => (
                                                    <tr key={car.carId}>
                                                        <td>{car.carName}</td>
                                                        <td>{car.carNumberplate}</td>
                                                        <td>
                                                            <Button
                                                                variant="secondary"
                                                                onClick={() => handleCarSelection(car)}
                                                                className="select-button"
                                                            >
                                                                Select
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>

                                        {selectedCarId ? <>{renderHandover}</> : <></>}

                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
            <br></br>
            <br></br>
        </>
    );
}

export default HandOver;