import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../sharedVariables";
import { ToastContainer, toast } from "react-toastify";
import { useUserFetch } from "../../hooks/useUserFetch";
import { Wrapper, WrapperGrid, Content } from "./Collection.styles";
import { useParams } from "react-router-dom";
import Thumb from "../Thumb";
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";
import NoImage from "../../images/no-image.jpg";

function Collection() {
  const { state: user, loading, error } = useUserFetch();
  const [movies, setMovies] = useState([]);
  const [collection, setCollection] = useState([]);
  const { collectionId } = useParams();
  const [sorted, setSorted] = useState(null);

  const sortByName = () => {
    const toSortList = [...movies];
    if (sorted === null || sorted === "des") {
      setSorted("asc");
      setMovies(toSortList.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle)));
    } else if (sorted === "asc") {
      setSorted("des");
      setMovies(toSortList.sort((a,b) => b.movieTitle.localeCompare(a.movieTitle)));
    }
  };

  useEffect(() => {
    axios.get(`${backendURL}/collections/${collectionId}`).then((response) => {
      setCollection(response.data);
      setMovies(response.data.movies);
      console.log(response.data);
    });
  }, [collectionId]);

  const deleteMovie = (movieId, collectionId) => {
    let data = {
      collectionID: collectionId,
      movieID: movieId,
    };
    try {
      axios
        .delete(`${backendURL}/collectionsMovies`, { data: data })
        .then((response) => {
          setMovies(movies.filter((movie) => movie.id !== movieId));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => {
    let headerElement = ["movie Image", "name", "action"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return movies && movies.map((value, key) => {
      return (
        <tr key={value.id}>
          <td>
            {" "}
            <Thumb
              key={value.id}
              clickable
              image={
                value.movieImg
                  ? IMAGE_BASE_URL + POSTER_SIZE + value.movieImg
                  : NoImage
              }
              movieId={value.tmdbID}
            />
          </td>
          <td>{value.movieTitle}</td>
          <td className="action">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Delete ${value.movieTitle} from ${collection.collectionName}?`
                  )
                ) {
                  deleteMovie(value.id, collection.id);
                  setMovies(movies);
                }
              }}
            >
              Delete movie
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <Wrapper>
      <div>
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            <h1>
              {collection.collectionName} of {user.data.userName}
            </h1>
            <button onClick={sortByName}>Sort by name</button>

            <WrapperGrid>
              <Content>
                <table id="movie">
                  <thead>
                    <tr>{renderHeader()}</tr>
                  </thead>
                  <tbody>{renderBody()}</tbody>
                </table>
                {/* {movies.map((value) => (
                  <Thumb
                    key={value.id}
                    clickable
                    image={
                      value.movieImg
                        ? IMAGE_BASE_URL + POSTER_SIZE + value.movieImg
                        : NoImage
                    }
                    movieId={value.tmdbID}
                  />
                ))} */}
              </Content>
            </WrapperGrid>
            <div>
              Total movies in {collection.collectionName.toLowerCase()}:{" "}
              {movies.length}
            </div>
          </div>
        )}
      </div>
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
    </Wrapper>
  );
}

export default Collection;
