import { useState, useEffect } from "react"; 
import Form from 'react-bootstrap/Form';


export default function City() { 
    const [cityList, setCityList] = useState([]); 

    const onChangeHandler = async (event) => {
        console.log(" City Change hua");
        let tempId = event.target.value; 
        sessionStorage.setItem("dropCityId", tempId); 
    }

    const handelClick = async (e) => {
        console.log("On click-> city drop down"); 

        e.preventDefault(); 
        // let temp = sessionStorage.getItem("pickUpStateId"); 
        // console.log(temp); 

        try {

            console.log("A");
            const response = await fetch("http://localhost:8080/api/cities/"  + sessionStorage.getItem("dropStateId")); 
            const result = await response.json();
            setCityList(result);  
            console.log("B");
        } catch (error) {
            console.error('Error fetching data:', error); 
            // yaha pe use navigate use karke Error page pe send karo 
        }
    }




    return (
        <section>
            <Form.Select aria-label="Select City" onChange={onChangeHandler} onClick={handelClick} > 
                <option> Select City</option> 
                {cityList.map(city => (
                    <option key={city.cityId} value={city.cityId}>
                        {city.cityName}
                    </option> 
                ))}
            </Form.Select>
        </section>
    )
}