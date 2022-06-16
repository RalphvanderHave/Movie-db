import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../sharedVariables";
import axios from "axios";
import { Wrapper } from "./Profile.styles.js";
import calendarLogo from "../../images/calendar_logo.png";
import { ToastContainer, toast } from "react-toastify";
import { useUserFetch } from "../../hooks/useUserFetch";
import Spinner from "../Spinner";
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import 'react-tabs/style/react-tabs.css';

function Profile() {
  // const [user, setUser] = useState("");
  const { state: user, loading, error, fetchUser } = useUserFetch();
  const [collections, setCollections] = useState([]);
  const [finished, setFinished] = useState(false);
  const [rerender, setRerender] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {}, [rerender]);

  const deleteCollection = (collectionId) => {
    let data = {
      userId: user.data.id,
      collectionId: collectionId,
    };
    try {
      axios
        .delete(`${backendURL}/collections`, { data: data })
        .then((response) => {
          console.log(response);
          setTimeout(() => {
            toast.success(response.data.message);
          }, 300);
          setRerender(!rerender);
          fetchUser();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      {loading && <Spinner />}
      {!loading && (
        <div className="profilePageContainer">
          <div className="basicInfo">
            <h1>Account information</h1>
            <h2> Username: {user.data.userName} </h2>
            <h2> Email: {user.data.userEmail}</h2>
            <button
              onClick={() => {
                navigate("/change_password");
              }}
            >
              Change password
            </button>
          </div>
          <Tabs selectedIndex={tabIndex} onSelect={(index) => {setTabIndex(index)}}>
            <TabList style={{margin: "5px"}}>
              <Tab>Collections</Tab>
              <Tab>Friends</Tab>
            </TabList>

            <TabPanel>
            <div className="collections">
              {/* <h1>Your collections</h1> */}

              {user.data.collections &&
                user.data.collections.map((value, key) => {
                  return (
                    <div key={key} className="collectionItem">
                      <div className="collectionName">
                        {" "}
                        {value.collectionName}
                      </div>
                      <div className="collectionCreatedDate">
                        <img
                          className="calendarLogo"
                          src={calendarLogo}
                          alt="calendar logo"
                        />
                        {value.createdAt.split("T", 1)}
                      </div>
                      <div>
                        Total movies in {value.collectionName.toLowerCase()}:{" "}
                        {value.movies.length}
                      </div>
                      <div>
                        <button
                          onClick={() => navigate(`/collections/${value.id}`)}
                        >
                          Go to {value.collectionName}
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm(`Delete ${value.collectionName}?`)
                            ) {
                              deleteCollection(value.id);
                              console.log(value.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            </TabPanel>
            <TabPanel>
              <div className="collections">
                <h1>Friends</h1>
              </div>
            </TabPanel>
          </Tabs>
          
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
      )}
    </Wrapper>
  );
}

export default Profile;
