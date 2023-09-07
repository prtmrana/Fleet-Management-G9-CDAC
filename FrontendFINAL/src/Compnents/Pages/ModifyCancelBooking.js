import Navbar from "../PageNavigation";
import Container from 'react-bootstrap/Container';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

function ModifyCancelBooking() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userEmailId, setUserEmailId] = useState('');
    const [booking, setBooking] = useState(null);
    const [carList, setCarList] = useState([]);
    const [editableFields, setEditableFields] = useState({});
    const [selectedCarId, setSelectedCarId] = useState();
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    const fetchBookingByEmailId = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/booking/by-email/${userEmailId}`);
            const result = await response.json();
            setBooking(result);

            // Fetch category name from booking object
            setCategoryName(result.category.categoryName);

            // Initialize editable fields state with default values
            const initialEditableFields = {};
            Object.keys(result).forEach((key) => {
                initialEditableFields[key] = false;
            });
            setEditableFields(initialEditableFields);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleEditing = (field) => {
        setEditableFields({ ...editableFields, [field]: !editableFields[field] });
    };

    const saveChanges = (field) => {
        if (field === 'pickupDate' || field === 'dropDate') {
            toggleEditing(field);
            // You can add additional validation or date parsing here if needed
        } else if (field === 'categoryName') {
            // Handle editing the category name
            toggleEditing(field);
        } else {
            // Handle other fields as before
            toggleEditing(field);
        }
    };

    const handleCarSelection = (selectedCar) => {
        console.log("Selected car:", selectedCar);
        setSelectedCarId(selectedCar.carId);
        sessionStorage.setItem("selectedCarId", selectedCar.carId);
    };

    const handleHandover = async () => {
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
                navigate("/handoversuccess")
            } else {
                console.error('Failed to create billing record.');
            }
        } catch (error) {
            console.error('Error creating billing record:', error);
        }
    };

    const handleModifyBooking = async () => {
        // Implement your logic to modify the booking here
        try {
            const response = await fetch('http://localhost:8080/api/addbooking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(booking) // Send the updated booking data
            });

            if (response.ok) {
                console.log('Booking modified successfully.');
                // Add any additional actions after successful modification
            } else {
                console.error('Failed to modify booking.');
            }
        } catch (error) {
            console.error('Error modifying booking:', error);
        }
    };

    const renderHandover = (
        <section>
            <Button variant="primary" onClick={handleHandover}>
                Handover
            </Button>
        </section>
    );

    const renderModifyButton = (
        <Button variant="success" onClick={handleModifyBooking}>
            Modify
        </Button>
    );

    const renderFieldRow = (fieldName, label) => (
        <tr key={fieldName}>
            <td><strong>{label}:</strong></td>
            {editableFields[fieldName] ? (
                <>
                    <td>
                        <input
                            type="text"
                            value={booking[fieldName]}
                            onChange={(e) => setBooking({ ...booking, [fieldName]: e.target.value })}
                        />
                    </td>
                    <td>
                        <Button variant="success" onClick={() => saveChanges(fieldName)}>
                            Save
                        </Button>
                    </td>
                </>
            ) : (
                <>
                    <td>{fieldName === 'categoryName' ? categoryName : booking[fieldName]}</td>
                    <td>
                        <Button variant="primary" onClick={() => toggleEditing(fieldName)}>
                            Edit
                        </Button>
                    </td>
                </>
            )}
        </tr>
    );

    return (
        <>
            <Navbar />
            <Container>
                <div style={{margin:"100px 0px 100px 0px"}}>
                    <div className="booking-details-container mdf" >
                        <h3>Booking Details</h3>
                        <div className="input-fields">
                            <input
                                type="text"
                                placeholder="Enter Email ID"
                                value={userEmailId}
                                onChange={(e) => setUserEmailId(e.target.value)}
                            /><br></br>
                            <Button variant="primary" onClick={fetchBookingByEmailId}>
                                Fetch by Email ID
                            </Button>
                        </div>
                        {booking && (
                            <div className="booking-table">
                                <Table striped bordered>
                                    <tbody>
                                        {renderFieldRow('aadharNo', 'Aadhar No')}
                                        {renderFieldRow('bookingDateAndTime', 'Booking Date and Time')}
                                        {renderFieldRow('firstName', 'First Name')}
                                        {renderFieldRow('lastName', 'Last Name')}
                                        {renderFieldRow('dLNumber', 'Driving License number')}
                                        {renderFieldRow('startDate', 'Pickup Date')}
                                        {renderFieldRow('endDate', 'Drop Date')}
                                        {renderFieldRow('categoryName', 'Category Name')}
                                    </tbody>
                                </Table>
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
                                {booking && renderModifyButton}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default ModifyCancelBooking;
