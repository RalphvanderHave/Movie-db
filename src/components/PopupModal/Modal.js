import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { backendURL } from "../sharedVariables";
import "./Modal.css";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Modal({closeModal, userId, data}) {
    const [user, setUser] = useState("");
    const [finished, setFinished] = useState(false);
    const [lists, setLists] = useState([]);
    let navigate = useNavigate();
    

    const optionsCollections = user && user.collections.map((value, key) => ({
      "value": value.id,
      "label": value.collectionName
    }))

    const handleChange = (lists) => {
      setLists(lists);
    }

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
              setTimeout(() => {
                toast.error("You are not logged in. You will be redirected to the homepage.");
              }, 500);
            navigate("/");  
            } else {
              axios
                .get(`${backendURL}/users/${response.data.id}`)
                .then((response) => {
                  if (response.data.error) {
                    console.log(response.data.error);
                  } else {
                    setUser(response.data);
                    setFinished(true);
                  }
                });
            }
          });
      }, []);

      function customTheme(theme) {
          return {
              ...theme,
              colors: {
                  ...theme.colors,
                  primary25: 'orange',
                  primary: 'green'
              }
          }
      }

      const saveMovieInCollections = () => {
        if (lists.length < 1) {
          toast.error("Please choose a collection to add the movie");
        } else {
          for (let i = 0; i < lists.length ; i++) {
            axios.post(`${backendURL}/movies`, {
              tmdbID: data.tmdbID,
              movieImg: data.movieImg,
              movieTitle: data.movieTitle,
            })
            .then((response) => {
              if (response.data.error) {
                console.log(response.data.error);
              } else {
                axios.post(`${backendURL}/collectionsMovies`, {
                  collectionID: lists[i].value,
                  movieID: response.data.id,
                })
                .then((response) => {
                  setTimeout(() => {
                    toast.info(response.data.message);
                  }, 500);
                  navigate("/");
                })
              }
            })
          }
        }
      }

  return (
    <div className='modalBackground'>
        <div className='modalContainer'>
            <div className='titleCloseBtn'> 
                <button onClick={() => closeModal(false)}> X </button>
            </div>
            <div className='title'>
                <h1>Add movie to multiple collections</h1>
            </div>
            <div className='body'>
                <Select 
                    components={makeAnimated()}
                    theme={customTheme}
                    options={optionsCollections}
                    className="mb-3"
                    placeholder="Select collections"
                    onChange={handleChange}
                    isSearchable
                    isMulti
                    noOptionsMessage={() => "No other collections?"}
                    autoFocus
                />
            </div>
            <div className='footer'>
                <button id="cancelBtn" onClick={() => closeModal(false)}>Cancel</button>
                <button onClick={saveMovieInCollections}>Continue</button>
            </div>
        </div>
    </div>
  );
}

export default Modal