import { useState, useEffect } from "react";
import Cities from "./PickupCity";
import Form from 'react-bootstrap/Form';

export default function States() {
    const [stateList, setStateList] = useState([]);
    const [stateId, setStateid] = useState(0);



    const onChangeHandler = async (event) => {
        console.log("Change hua");
        let tempId = event.target.value;
        sessionStorage.setItem("dropStateId", tempId);
    }

    const handelClick = async (e) => {
        // console.log("On click");
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/states");
            const result = await response.json();
            setStateList(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            // yaha pe use navigate use karke Error page pe send karo 
        }
    }

    return (
        <section>
            <Form.Select aria-label="Select State" onChange={onChangeHandler} onClick={handelClick} >
                <option> Select State</option>
                {stateList.map(state => (
                    <option key={state.stateId} value={state.stateId} >
                        {state.stateName}
                    </option>
                ))}
            </Form.Select>
        </section>
    )
}