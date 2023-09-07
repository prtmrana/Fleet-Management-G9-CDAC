import Navbar from "../PageNavigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AboutUs() {

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
                    <div className="section">
                        <div>
                            <h1>About Us</h1>
                            <p>Welcome to XYZ Car Rentals! We are your trusted partner for all your car rental needs.</p>
                            <p>Our Mission:</p>
                            <p>At XYZ Car Rentals, our mission is to provide convenient and affordable car rental solutions to our customers. We strive to exceed expectations and deliver top-notch service every time you rent a car with us.</p>
                            <p>Our Values:</p>
                            <ul>
                                <li>Customer Satisfaction: Your satisfaction is our priority. We're committed to ensuring you have a seamless and enjoyable car rental experience.</li>
                                <li>Quality Fleet: Our fleet consists of well-maintained, reliable vehicles to ensure your safety and comfort.</li>
                                <li>Convenience: We offer easy online booking and flexible pick-up and drop-off options to suit your schedule.</li>
                                <li>Transparent Pricing: With XYZ Car Rentals, you'll always know what you're paying for. No hidden fees.</li>
                            </ul>
                            <p>Contact Us:</p>
                            <p>If you have any questions or inquiries, don't hesitate to contact our customer support team. We're here to assist you!</p>
                            <p>Thank you for choosing XYZ Car Rentals.</p>
                        </div>
                    </div>
                </Row>
            </Container>

        </>
    )
} 