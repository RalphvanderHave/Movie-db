import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { Wrapper, Content } from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { backendURL } from "../sharedVariables";
import axios from "axios";
import { useUserFetch } from "../../hooks/useUserFetch";

import RMDBLogo from "../../images/react-movie-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import useFetchUser from "../../helpers/FetchUser";
import AddCollModal from "../PopupModal/AddCollModal";

function UserNav({ logout }) {
  const { state: user, loading, error, fetchUser } = useUserFetch();
  const navigate = useNavigate();
  const [loading2, setLoading2] = useState(true);
  const [collections, setCollections] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (error) {
      console.log("Auth Error");
      console.log(error);
    }
    if (!openModal) {
      fetchUser();
    }
  }, [openModal]);

  return (
    <Container>
      {openModal && <AddCollModal closeModal={setOpenModal} />}
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Item 
          id="basic-navbar-nav" 
          flip 
          style={{color: "var(--lightGrey)", paddingRight: "20px", cursor: "pointer"}}
          onClick={() => {setOpenModal(true)}}
          >
          Add Collection
        </Nav.Item>
      </Navbar.Collapse>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            <Nav>
              <NavDropdown
                align="end"
                flip
                title="Collection"
                id="basic-nav-dropdown"
                style={{ paddingRight: "20px" }}
              >
                {user.data.collections &&
                  user.data.collections.map((value, key) => (
                    <NavDropdown.Item
                      key={key}
                      onClick={() => navigate(`/collections/${value.id}`)}
                    >
                      {value.collectionName}
                    </NavDropdown.Item>
                  ))}
              </NavDropdown>
            </Nav>
          </div>
        )}
      </Navbar.Collapse>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            <Nav>
              <NavDropdown
                title={
                  <>
                    <FontAwesomeIcon icon={faUserCircle} size="1x" />
                    <span style={{ paddingLeft: "5px", marginBottom: "10px" }}>
                      {user.data.userName}
                    </span>
                  </>
                }
                id="basic-nav-dropdown"
                style={{ paddingRight: "20px" }}
              >
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  onClick={(e) => {
                    logout(e);
                    navigate("/");
                  }}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        )}
      </Navbar.Collapse>
    </Container>
  );
}

function GuestNav() {
  const navigate = useNavigate();
  return (
    <Nav>
      <NavDropdown
        align="end"
        flip
        title="Account"
        id="basic-nav-dropdown"
        style={{ paddingRight: "20px" }}
      >
        <NavDropdown.Item
          onClick={() => navigate("/login")}
          style={{ paddingRight: "20px" }}
        >
          Login
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => navigate("/register")}>
          Register
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export function LoggedNav({ logout }) {
  const { authState } = useContext(AuthContext);
  if (authState) {
    return <UserNav logout={logout} />;
  }
  return <GuestNav />;
}

function Header() {
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
    toast.success("Logged out succesfully.");
  };

  return (
    <Wrapper>
      <Content>
        <Navbar
          className="primarycolor"
          variant="dark"
          expand="md"
          id="top-header"
        >
          <Container>
            <Navbar.Brand
              onClick={() => navigate("/")}
              style={{ paddingLeft: "20px", cursor: "pointer" }}
            >
              <img
                alt="rmdb-logo"
                src={RMDBLogo}
                width="200"
                height="50"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>{" "}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <NavDropdown
                  align="end"
                  flip
                  title="Categories"
                  id="basic-nav-dropdown"
                  style={{ paddingLeft: "20px", paddingRight: "20px" }}
                >
                  <NavDropdown.Item onClick={() => navigate("/")}>
                    Populair
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/now_playing")}>
                    Now Playing
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/upcoming")}>
                    Upcoming
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar
          className="primarycolor"
          variant="dark"
          expand="md"
          id="top-header"
        >
          <LoggedNav logout={logout} />
        </Navbar>
      </Content>
    </Wrapper>
  );
}
export default Header;
