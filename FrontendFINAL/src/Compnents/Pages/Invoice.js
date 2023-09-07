import React, { useState, useEffect } from 'react';
import '../../Style/Invoice.css';
import Navbar from '../PageNavigation';
import { useNavigate } from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBTypography,
    MDBTable,
    MDBTableHead,
    MDBTableBody,
} from 'mdb-react-ui-kit';


function Invoice({ invoiceRef }) {
    const [billingRecords, setBillingRecords] = useState([]);

    useEffect(() => {
        // Fetch billing records when the component mounts
        fetchBillingRecords();
    }, []);

    const fetchBillingRecords = () => {
        // Fetch all billing records from your API endpoint
        fetch('http://localhost:8080/api/billing/by-bookingid/' + sessionStorage.getItem('bookingId'))
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setBillingRecords(data);
            })
            .catch((error) => {
                console.error('Error fetching billing records:', error);
            });
    };

    const navigate = useNavigate();
    const handleDone = () => {
        // Define the action you want to perform when the "Done" button is clicked
        // For example, navigate to the "returnsuccess.js" page.
        // Replace '/returnsuccess' with the actual route you want to navigate to.
       navigate('/'); // Use history.push to navigate
    };


    return (
        <div className="container mt-4 invoice-container">
            <Navbar />
            <div className="invoice-header">
                <h3>Invoice</h3>
            </div>
            <MDBCard className="p-4">
                <MDBCardBody>
                    <MDBContainer className="mb-2 mt-3">
                        <MDBRow className="d-flex align-items-baseline">
                            <MDBCol xl="9">
                                <p style={{ color: "#7e8d9f", fontSize: "20px" }}>
                                    Invoice &gt; &gt; <strong>ID: #{billingRecords.billingId}</strong>
                                </p>
                            </MDBCol>
                            <MDBCol xl="3" className="float-end">

                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                    <MDBContainer>
                        <MDBCol md="12" className="text-center">
                            <MDBIcon
                                fab
                                icon="mdb"
                                size="4x"
                                className="ms-0 "
                                style={{ color: "#5d9fc5" }}
                            />
                            <p className="pt-0">India Drive</p>
                        </MDBCol>
                    </MDBContainer>
                    <MDBRow>
                        <MDBCol xl="8">
                            <MDBTypography listUnStyled>
                                <li className="text-muted">
                                    To: <span style={{ color: "#5d9fc5" }}>{billingRecords.userName}</span>
                                </li>
                                <li className="text-muted">{billingRecords.userAddress}</li>
                                <li className="text-muted">{billingRecords.userCity}</li>
                                <li className="text-muted">
                                    <MDBIcon fas icon="phone-alt" /> {billingRecords.userPhone}
                                </li>
                            </MDBTypography>
                        </MDBCol>
                        <MDBCol xl="4">
                            <p className="text-muted">Invoice</p>
                            <MDBTypography listUnStyled>
                                <li className="text-muted">
                                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                                    <span className="fw-bold ms-1">ID:</span>#{billingRecords.billingId}
                                </li>
                                <li className="text-muted">
                                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                                    <span className="fw-bold ms-1">Creation Date: </span>{billingRecords.endDate}
                                </li>
                                <li className="text-muted">
                                    <MDBIcon fas icon="circle" style={{ color: "#84B0CA" }} />
                                    <span className="fw-bold ms-1">Staff Name:</span>
                                    <span className="badge bg-warning text-black fw-bold ms-1">
                                        {billingRecords.staffName}
                                    </span>
                                </li>
                            </MDBTypography>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow className="my-2 mx-1 justify-content-center">
                        <MDBTable striped borderless>
                            <MDBTableHead
                                className="text-white"
                                style={{ backgroundColor: "#84B0CA" }}
                            >
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Customer name</th>
                                    <th scope="col">Final fuel status</th>
                                    <th scope="col">User email id</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td> {billingRecords.userName}</td>
                                    <td>{billingRecords.fuelStatus}</td>
                                    <td>{billingRecords.userEmailId}</td>
                                    <td>{billingRecords.billAmount}</td>
                                </tr>

                            </MDBTableBody>
                        </MDBTable>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol xl="8">
                            <p className="ms-3">
                                Add additional notes and payment information
                            </p>
                        </MDBCol>
                        <MDBCol xl="3">

                            <p className="text-black float-start">
                                <span className="text-black me-3"> Total Amount</span>
                                <span style={{ fontSize: "25px" }}>{billingRecords.billAmount}</span>
                            </p>
                        </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                        <MDBCol xl="10">
                            <p>Thank you for your purchase</p>
                        </MDBCol>
                        <MDBCol xl="2">
                            <MDBBtn
                                style={{ backgroundColor: "#60bdf3" }}
                                onClick={() => window.print()}
                            >
                                Print
                            </MDBBtn>

                            <MDBBtn
                                style={{ backgroundColor: "#60bdf3" ,marginLeft:"10px"}}
                                onClick={handleDone}
                            >
                                Done
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}

export default Invoice;
