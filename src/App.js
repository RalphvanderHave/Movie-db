import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
//Routing
import { HashRouter, Routes, Route } from "react-router-dom";

//Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import NowPlaying from "./components/NowPlaying";
import Upcoming from "./components/Upcoming";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import ChangePassword from "./components/ChangePassword";
import AddCollection from "./components/AddCollection";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import { backendURL } from "./components/sharedVariables";
import Collection from "./components/Collection/Collection";

// Context
import UserProvider from "./context";

//styles
import { GlobalStyle } from "./GlobalStyle";

const key = Date.now();

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get(`${backendURL}/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
          setAuthState(false);
        } else {
          console.log(response.data);
          setAuthState(true);
        }
      });
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <HashRouter>
          <UserProvider>
            <Header />
            <Routes>
              <Route key={key} path={`/`} element={<Home />} />
              <Route key={key} path={`/*`} element={<NotFound />} />
              <Route key={key} path={`/:movieId`} element={<Movie />} />
              <Route key={key} path={`/now_playing`} element={<NowPlaying />} />
              <Route key={key} path={`/upcoming`} element={<Upcoming />} />
              <Route key={key} path={`/profile`} element={<Profile />} />
              <Route key={key} path={`/login`} element={<Login />} />
              <Route key={key} path={`/register`} element={<Register />} />
              <Route
                key={key}
                path={`/addCollection`}
                element={<AddCollection />}
              />
              <Route
                key={key}
                path={`/change_password`}
                element={<ChangePassword />}
              />
              <Route
                key={key}
                exact
                path={`/collections/:collectionId`}
                element={<Collection />}
              />
            </Routes>
            <Footer />
            <GlobalStyle />
          </UserProvider>
        </HashRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
