import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { backendURL } from "../sharedVariables";
import { ToastContainer, toast } from "react-toastify";

function Register({ setAuth }) {
  let navigate = useNavigate();
  const initialValues = {
    userName: "",
    userEmail: "",
    userPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Please enter a username"),
    userEmail: Yup.string().email().required("Please enter your email"),
    userPassword: Yup.string()
      .min(3)
      .max(15)
      .required("Please enter a password"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("userPassword"), null], "Passwords must match"),
  });

  const onSubmit = (data) => {
    console.log(data);

    axios
      .post(`${backendURL}/users`, data)
      .then((response) => {
        if (response.request.status === 200) {
          axios
            .post(`${backendURL}/collections`, {
              collectionName: "Collection",
              userId: response.data.id,
            })
            .then((res) => {
              console.log(res);
            });
          axios
            .post(`${backendURL}/collections`, {
              collectionName: "Wantlist",
              userId: response.data.id,
            })
            .then((resp) => {
              console.log(resp);
            });
          setTimeout(() => {
            toast.success("Registration succesful!");
          }, 500);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
          if (
            error.response.status === 400 &&
            error.message === "Request failed with status code 400"
          ) {
            console.log("error: user already exists!");
            toast.error("User already exists!", {
              position: "top-center",
              closeOnClick: true,
            });
          } else {
            console.log(error);
            toast.error("Something went wrong!", {
              position: "top-center",
              closeOnClick: true,
            });
          }
        }
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <h1 style={{ textAlign: "center", color: "var(--darkGrey)" }}>
            Sign up
          </h1>
          <label>Name: </label>
          <ErrorMessage name="userName" component="span" />
          <Field id="inputCreatePost" name="userName" placeholder="Name..." />

          <label>Email: </label>
          <ErrorMessage name="userEmail" component="span" />
          <Field id="inputCreatePost" name="userEmail" placeholder="Email..." />

          <label>Password: </label>
          <ErrorMessage name="userPassword" component="span" />
          <Field
            id="inputCreatePost"
            name="userPassword"
            placeholder="Password..."
            type="password"
          />
          <label>Confirm password: </label>
          <ErrorMessage name="confirmPassword" component="span" />
          <Field
            id="inputCreatePost"
            name="confirmPassword"
            placeholder="Confirm password..."
            type="password"
          />

          <button type="submit" className="btn btn-warning w-100">
            Sign Up
          </button>

          <div className="text-center mb-2">
            Already have an account? &nbsp; <br />
            <Link to={`/login`}>Login</Link>
          </div>
        </Form>
      </Formik>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Register;
