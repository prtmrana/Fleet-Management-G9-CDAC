import { useState, useEffect } from 'react';
import Navbar from '../PageNavigation';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function ContactUs() {
    const rowStyle = {
        border: '1px solid gray', // Add border
        backgroundColor: 'lightgray', // Add gray background color
        // padding: '10px', // Add padding for spacing
    };
    return (
        <>
            <Navbar />
            <Container>
                <Row style={rowStyle}> 
                    <div >
                        <h1>Customer Care</h1>
                        <p>Welcome to our Customer Care center. We're here to assist you with any questions or concerns you may have.</p>
                        <h2>Contact Information</h2>
                        <p>If you need help or have inquiries, feel free to reach out to our dedicated customer support team:</p>
                        <ul>
                            <li>Email: <a href="mailto:customersupport@example.com">customersupport@example.com</a></li>
                            <li>Phone: 1-800-CAR-RENT</li>
                        </ul>
                        <h2>Frequently Asked Questions (FAQ)</h2>
                        <p>Before contacting us, you might find an answer to your question in our Frequently Asked Questions:</p>
                        <ul>
                            <li><strong>How do I make a reservation?</strong><br />You can easily make a reservation online through our website. Just select your desired vehicle and pick-up/drop-off locations, and follow the steps to complete your booking.</li>
                            <li><strong>What documents do I need to rent a car?</strong><br />You'll need a valid driver's license, a credit card, and proof of insurance.</li>
                            <li><strong>What's the cancellation policy?</strong><br />Our cancellation policy varies depending on the type of booking. You can find detailed information in the booking confirmation email.</li>
                            {/* Add more FAQ items */}
                        </ul>
                        <h2>Feedback and Suggestions</h2>
                        <p>We value your feedback! If you have suggestions for improving our service or any feedback to share, please let us know. Your input helps us serve you better.</p>
                        <p>Thank you for choosing XYZ Car Rentals for your car rental needs.</p>
                    </div>
                </Row>
            </Container>

        </>
    )
}