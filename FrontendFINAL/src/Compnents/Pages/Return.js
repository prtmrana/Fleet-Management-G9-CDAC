import Navbar from "../PageNavigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";

function Return() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userEmailId, setUserEmailId] = useState('');
    const [booking, setBooking] = useState(null);
    const [billing, setBilling] = useState(null);
    const [carList, setCarList] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState();
    const navigate = useNavigate();
    const [fuelStatus, setFuelStatus] = useState();
    const [totalCost, setTotalCost] = useState();
    const [currentDateTime, setCurrentDateTime] = useState();

    const handleFuelStatusChange = (event) => {
        setFuelStatus(event.target.value);
    };


    const fetchBookingByEmailId = () => {
        fetch(`http://localhost:8080/api/booking/by-email/${userEmailId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((result) => {
                setBooking(result);
                console.log("booking result-> ");
                console.log(result);

                sessionStorage.setItem("bookingId", result.bookingId);
                return fetch(`http://localhost:8080/api/billing/by-bookingid/${result.bookingId}`);
            })
            .then((billingResponse) => {
                if (!billingResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                return billingResponse.json();
            })
            .then((billingResult) => {
                setBilling(billingResult);
                console.log("billing result-> ");
                console.log(billingResult);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

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
                startDate: "2023-08-31T12:00:00",
                endDate: "2023-09-01T12:00:00",
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

    function roundToDecimalPlaces(number, decimalPlaces) {
        const factor = 10 ** decimalPlaces;
        return Math.round(number * factor) / factor;
    }
    let SystemDate = "2000-01-01T12:00:00"; // isko const nahi rakhna , bcoz it is being changed later 

    const handleBillAmount = () => {
        let tempCost = 0.0;
        const numberOfAddonsSelected = localStorage.getItem("numberOfAddonsSelected");
        const startDate = new Date(booking.startDate);
        console.log("start-> " + startDate);
        // SystemDate = new Date(); // Current date and time 
        const year1 = startDate.getFullYear();
        const month1 = String(startDate.getMonth() + 1).padStart(2, '0'); // Adding leading zero
        const day1 = String(startDate.getDate()).padStart(2, '0'); // Adding leading zero
        const hours1 = String(startDate.getHours()).padStart(2, '0'); // Adding leading zero
        const minutes1 = String(startDate.getMinutes()).padStart(2, '0'); // Adding leading zero
        const seconds1 = String(startDate.getSeconds()).padStart(2, '0'); // Adding leading zero
        const formattedDate1 = `${year1}-${month1}-${day1}T${hours1}:${minutes1}:${seconds1}`;
        console.log("start-> " + formattedDate1);

        const currentDate = new Date(); // 2023-09-22T15:30:00 // 2023-8-30T8:22:23
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding leading zero
        const day = String(currentDate.getDate()).padStart(2, '0'); // Adding leading zero
        const hours = String(currentDate.getHours()).padStart(2, '0'); // Adding leading zero
        const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Adding leading zero
        const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Adding leading zero 
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        // setCurrentDateTime(formattedDate); 




        setCurrentDateTime("2023-11-22T15:30:00");







        console.log(formattedDate);

        // Calculate the difference in milliseconds
        const differenceMilliseconds = new Date(currentDateTime) - new Date(formattedDate1);
        // Calculate the difference in seconds, minutes, hours, and days
        const secondsDifference = Math.abs(differenceMilliseconds / 1000);
        const minutesDifference = Math.abs(secondsDifference / 60);
        const hoursDifference = Math.abs(minutesDifference / 60);
        const daysDifference = Math.abs(hoursDifference / 24);

        console.log(daysDifference);

        let tempDays = Math.ceil(daysDifference); // if days comes 4.3 then it will be considered as 5 days 

        let months = 0, weeks = 0, days = 0;
        months = tempDays / 30;
        tempDays = tempDays % 30;
        weeks = weeks / 7;
        tempDays = tempDays % 7;
        days = tempDays;

        let fulePrice = 0;
        if (fuelStatus === "full") {
            fulePrice = 0;
        }
        else if (fuelStatus === "half") {
            fulePrice = 5;
        }
        else {
            fulePrice = 10;
        }


        tempCost = (numberOfAddonsSelected * 100) +
            (months * booking.category.monthlyRates) + (weeks * booking.category.weeklyRates) + (days * booking.category.dailyRates) +
            (fulePrice);

        setTotalCost(roundToDecimalPlaces(tempCost, 2));


    };

    const renderBillAmount = (
        <section>
            <Button variant="primary" onClick={handleBillAmount}>
                Generate Bill Amount
            </Button>
        </section>
    );


    const handleUpdateBillingInfo = async () => {
        try {
            const updatedBillingData = {
                billAmount: totalCost, // Update with the new bill amount
                fuelStatus: fuelStatus, // Update with the selected fuel status
                endDate: currentDateTime, // Keep the existing endDate
            };

            const response = await fetch(`http://localhost:8080/api/updatebilling/${billing.userEmailId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBillingData),
            });

            if (response.ok) {
                console.log('Billing record updated successfully.');
                // Perform any additional actions after successful update
                navigate('/inovice'); // Navigate to the Invoice component
            } else {
                console.error('Failed to update billing record.');
            }
        } catch (error) {
            console.error('Error updating billing record:', error);
        }
    };


    const handleDone = () => {
        // Define the action you want to perform when the "Done" button is clicked
        // For example, you can navigate to another page or perform some other action.
        // Replace the following line with your desired logic.
        console.log("Done button clicked");
    };



    return (
        <>
            <Navbar />
            <Container>

                <div>
                    <h3>Return Car</h3>
                    <div className="booking-details-container">
                        <h5>Enter customer's email id</h5>
                        <div className="input-fields">
                            <input
                                type="text"
                                placeholder="Enter Email ID"
                                value={userEmailId}
                                onChange={(e) => setUserEmailId(e.target.value)}
                            />
                            <Button variant="primary" onClick={fetchBookingByEmailId}>
                                Fetch by Email ID
                            </Button>
                        </div>
                        {billing && (
                            <div className="booking-table">
                                <Table striped bordered>
                                    <tbody>
                                        <tr>
                                            <td><strong>Billing ID:</strong></td>
                                            <td>{billing.billingId}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Staff:</strong></td>
                                            <td>{billing.staffName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Customer Name:</strong></td>
                                            <td>{billing.userName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Email ID:</strong></td>
                                            <td>{billing.userEmailId}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Fuel Status:</strong></td>
                                            <td>{fuelStatus || billing.fuelStatus}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Bill Amount:</strong></td>
                                            <td>{totalCost || billing.billAmount}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Start Date:</strong></td>
                                            <td>{billing.startDate}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>End Date:</strong></td>
                                            <td>{billing.endDate}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Category:</strong></td>
                                            <td>{billing.booking.category.categoryName}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Car Reg. Number:</strong></td>
                                            <td>{billing.car.carNumberplate}</td>
                                        </tr>
                                    </tbody>
                                </Table>

                                <div>
                                    <div>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                // Show the radio buttons when the Fuel Status button is clicked
                                                // You can also toggle the visibility with a state variable if needed
                                                setFuelStatus(''); // Clear the selected value when the button is clicked
                                            }}
                                        >
                                            Fuel Status
                                        </Button>

                                        {fuelStatus === '' || (
                                            <Form>
                                                <Form.Check
                                                    type="radio"
                                                    label="Empty"
                                                    name="fuelStatus"
                                                    value="empty"
                                                    checked={fuelStatus === 'empty'}
                                                    onChange={handleFuelStatusChange}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Half"
                                                    name="fuelStatus"
                                                    value="half"
                                                    checked={fuelStatus === 'half'}
                                                    onChange={handleFuelStatusChange}
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="Full"
                                                    name="fuelStatus"
                                                    value="full"
                                                    checked={fuelStatus === 'full'}
                                                    onChange={handleFuelStatusChange}
                                                />
                                            </Form>
                                        )}

                                        {/* Display the selected fuel status */}
                                        {fuelStatus !== '' && <p>Selected Fuel Status: {fuelStatus}</p>}
                                    </div>

                                    <div>
                                        {fuelStatus ? <>{renderBillAmount}</> : <></>}
                                        <br />
                                        <Button variant="primary" onClick={handleUpdateBillingInfo}>
                                            Generate Invoice
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Return;