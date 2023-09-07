{
  "billingName": "John Doe",
    "userName": "Alice",
      "userEmailId": "alice@example.com",
        "customerMobileNo": "555-555-5555",
          "customerAadharNo": "5555555555",
            "customerPassNo": "9876543210",
              "billAmount": 0.0,
                "fuelStatus": "full",
                  "startDate": "2023-08-31T12:00:00",
                    "endDate": "2023-09-01T12:00:00",
                      "categoryId": 1,
                        "car": {
    "carId": 3
  },
  "booking": {
    "bookingId": 1
  },
  "pickupHub": {
    "hubId": 1
  },
  "dropHub": {
    "hubId": 2
  }
}


const fetchBookingByEmailId = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/booking/by-email/${userEmailId}`);
    const result = await response.json();
    setBooking(result);
    console.log("booking result-> ");
    console.log(result);
    // console.log(booking.bookingId);  
    // fetchBillingByBookingId(); 

    try {
      console.log("fetchBillingByBookingId isme aaya");
      const billingResponse = await fetch(`http://localhost:8080/api/billing/by-bookingid/${result.bookingId}`);
      const billingResult = await billingResponse.json();
      setBilling(billingResult);
      console.log("billing result-> ");
      console.log(billingResult);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};