import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../sharedVariables";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useUserFetch } from "../../hooks/useUserFetch";
import Spinner from "../Spinner";

function AddCollection() {
  let navigate = useNavigate();
  const { state: user, loading, error, fetchUser } = useUserFetch();

  const initialValues = {
    collectionName: "",
  };

  const validationSchema = Yup.object().shape({
    collectionName: Yup.string().required("Please enter a collection name"),
  });

  const onSubmit = (data) => {
    console.log(data.collectionName);
    console.log(user.data.id);
    console.log(user);
    axios
      .post(`${backendURL}/collections`, {
        collectionName: data.collectionName,
        userId: user.data.id,
      })
      .then((res) => {
        if (res.data.message) {
          setTimeout(() => {
            toast.error("Error adding collection");
          }, 500);
        } else {
          setTimeout(() => {
            toast.success("Collection added successfully");
          }, 500);
          navigate("/");
        }
      })
      .catch(function (error) {
        toast.error("Something went wrong!", {
          position: "top-center",
          closeOnClick: true,
        });
      });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, []);

  return (
    <div className="createPostPage">
      {loading && <Spinner />}
      {!loading && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <h1 style={{ textAlign: "center", color: "var(--darkGrey)" }}>
              Add collection
            </h1>
            <label>Name of the collection: </label>
            <ErrorMessage name="collectionName" component="span" />
            <Field
              id="inputCreatePost"
              name="collectionName"
              placeholder="Name..."
            />

            <button type="submit" className="btn btn-warning w-100">
              Add collection
            </button>
          </Form>
        </Formik>
      )}
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

export default AddCollection;
