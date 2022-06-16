import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { backendURL } from "../sharedVariables";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import { toast } from "react-toastify";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    const data = { userEmail: userEmail, password: password };
    axios.post(`${backendURL}/users/login`, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.accesToken);
        setAuthState(true);
        setTimeout(() => {
          toast.success("Login successful!");
        }, 500);
        navigate("/");
      }
    });
  };

  const loginDemo = () => {
    const data = { userEmail: "testify@test.nl", password: "test" };
    axios.post(`${backendURL}/users/login`, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.accesToken);
        setAuthState(true);
        navigate("/");
      }
    });
  };

  return (
    <div className="loginContainer">
      <label>Useremail: </label>
      <input
        type="text"
        onChange={(event) => {
          setUserEmail(event.target.value);
        }}
      />
      <label>Password: </label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <div className="text-center mb-2">
        <button className="btn btn-warning w-100" onClick={login}>
          Login
        </button>
        <button className="btn btn-warning w-100" onClick={loginDemo}>
          Demo user
        </button>
        Don&apos;t have an account? &nbsp; <br />
        <Link to={`/register`}>Sign up</Link>
      </div>
    </div>
  );
}
export default Login;
