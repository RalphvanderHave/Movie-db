import React, { useEffect } from "react";
import axios from "axios";
import { backendURL } from "../sharedVariables";
import "./AddCollModal.css";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useUserFetch } from "../../hooks/useUserFetch";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "../Spinner";

function AddCollModal({ closeModal }) {
  const { state: user, loading, error } = useUserFetch();

  const initialValues = {
    collectionName: "",
  };

  const validationSchema = Yup.object().shape({
    collectionName: Yup.string().required("Please enter a collection name"),
  });

  const onSubmit = (data) => {
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
          closeModal(false);
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
    <div className="modalBackground">
      {loading && <Spinner />}
      {!loading && (
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button onClick={() => closeModal(false)}> X </button>
          </div>
          <div className="title">
            <h1>Add new collection</h1>
          </div>
          <div className="body">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form>
                <label>Name of the collection: </label>
                <ErrorMessage name="collectionName" component="span" />
                <Field
                  id="inputCreatePost"
                  name="collectionName"
                  placeholder="Name..."
                />
              </Form>
            </Formik>
          </div>
          <div className="footer">
            <button id="cancelBtn" onClick={() => closeModal(false)}>
              Cancel
            </button>
            <button onClick={onSubmit}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddCollModal;
