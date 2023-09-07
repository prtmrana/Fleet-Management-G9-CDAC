import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';


export default function PickupAirport() { 
    const [airportList, setAirportList] = useState([]); 
    const navigate=useNavigate();

    const onChangeHandler = async (event) => {
        console.log("pickup airport-> ");
        let tempId = event.target.value; 
        sessionStorage.setItem("pickUpAirportId", tempId); 
    }


    // const handleClickto = async () => {
    //     navigate('/HubSelector'); // Navigate to HubSelector component
    // }
    const handelClick = async (e) => {
        console.log("On click-> drop down"); 

        // e.preventDefault(); 
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
            <div>
            <Form.Select aria-label="Select Airport" onChange={onChangeHandler} onClick={handelClick} > 
                <option> Select Airport</option> 
                {airportList.map(airport => (
                    <option key={airport.airportId} value={airport.airportId}>
                        {airport.airportCode} : {airport.airportName}
                    </option> 
                ))} 
            </Form.Select>
            </div>
            <div>
            {/* <button onClick={handleClickto}>Search hub</button> */}
            </div>
            
        </section>
    )
}