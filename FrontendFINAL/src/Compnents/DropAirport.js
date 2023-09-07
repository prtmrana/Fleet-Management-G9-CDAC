import { useState, useEffect } from "react"; 
import Form from 'react-bootstrap/Form';


export default function PickupAirport() { 
    const [airportList, setAirportList] = useState([]); 

    const onChangeHandler = async (event) => {
        console.log(" Drop airport");
        let tempId = event.target.value; 
        sessionStorage.setItem("dropAirportId", tempId); 
    }

    const handelClick = async (e) => {
        console.log("On click-> drop down"); 

        e.preventDefault(); 
        // let temp = sessionStorage.getItem("pickUpStateId"); 
        // console.log(temp); 

        try {

            console.log("A");
            const response = await fetch("http://localhost:8080/api/airports"); // get all airports 
            const result = await response.json();
            setAirportList(result);  
            console.log("B");
        } catch (error) {
            console.error('Error fetching data:', error); 
            // yaha pe use navigate use karke Error page pe send karo 
        }
    }

    // /api/airports


    return (
        <section>
            <Form.Select aria-label="Select Airport" onChange={onChangeHandler} onClick={handelClick} > 
                <option> Select Airport</option> 
                {airportList.map(airport => (
                    <option key={airport.airportId} value={airport.airportId}>
                        {airport.airportCode} : {airport.airportName}
                    </option> 
                ))} 
            </Form.Select>
        </section>
    )
}