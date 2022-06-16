import React, {useState} from 'react'
import axios from 'axios';
import { backendURL } from "./sharedVariables";
import { useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    let navigate = useNavigate();

    const changePassword = () => {
        axios.put(`${backendURL}/changepassword`, 
        {oldPassword: oldPassword, newPassword: newPassword}, 
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            } else {
                setShowAlert(true);
            }
        })
    }

    return (
        <div className="loginContainer">
            <Alert show={showAlert} variant="succes">
                <Alert.Heading>Success!</Alert.Heading>
                <p style={{color: "var(--darkGrey)"}}>Password update was successful</p>
                <hr />
                <div className='d-flex justify-content-end'>
                    <button onClick={() => {
                        setShowAlert(false);  
                        navigate("/profile");}}>
                            Close
                    </button>
                </div>
            </Alert>
            <h1 style={{ textAlign: "center", color: "var(--darkGrey)" }}>
            Change your password
            </h1>
            <div>
            <input type="password" placeholder='Old password...' onChange={(event) => {
                setOldPassword(event.target.value);
            }}/>
            </div>
            
            <div>
            <input type="password" placeholder='New password...' onChange={(event) => {
                setNewPassword(event.target.value);
            }} />
            </div>

            <button onClick={changePassword}>Save Changes</button>
        </div>
    );
}

export default ChangePassword;