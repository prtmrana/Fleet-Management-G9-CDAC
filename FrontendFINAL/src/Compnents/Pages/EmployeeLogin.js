import React, { useState } from "react";
import ReactDOM from "react-dom";
import PageNavigation from "../PageNavigation";
import { useNavigate } from "react-router-dom"; 
import { Button } from "react-bootstrap"; 
import "../../Style/UserLogin.css"; 


function EmployeeLogin() {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate(); 

    const errors = {
        uname: "invalid username or password",
        pass: "invalid password or password"
    };

    const handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info --> yaha par aayega fetch 
        console.log(uname.value);
        console.log(pass.value); 


        fetch("http://localhost:8080/api/employee/login", {
            method: "POST",
            body: JSON.stringify({
                email: uname.value,
                password: pass.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status === 200 && response.headers.get("content-length") === "0") {
                    console.log("username / password mismatch");
                    setErrorMessages({ name: "pass", message: errors.pass });
                    throw new Error("Empty response");
                }
                return response.json();
            })
            .then((result) => {
                setIsSubmitted(true); 
                console.log("submitted & got reply");
                // Process the result here 
                sessionStorage.setItem("isEmployeeLoggedIn", true); 
                sessionStorage.setItem("employeeName", result.firstName + " " +result.lastName); 
                // in case of employee we don't need to store all the information 
                // about an employee in the session-storage 

                navigate("/"); 

            })
            .catch(error => {
                console.error("Error during fetch:", error);
                // Handle any errors that occurred during the fetch
            });
    }; 

    const handelButton = ()=> {
        navigate("/userlogin"); 
    }


    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form 
    const renderForm = ( 
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" value={"Login"}/>
                </div>
            </form>
            <Button onClick={handelButton}>Login as User</Button> 
        </div>
    );

    return (
        <>
            <PageNavigation />
            <div className="app">

                <div className="login-form">
                    <div className="title">Staff Login</div> 
                    {renderForm} 
                </div>
            </div>
        </>
    );
}

export default EmployeeLogin; 