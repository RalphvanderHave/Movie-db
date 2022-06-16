import React, { useState } from "react";
//Components
import Thumb from "../Thumb";
//Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
//Image
import NoImage from "../../images/no-image.jpg";
//Styles
import {
  Wrapper,
  Content,
  Text,
  Button,
  ButtonContainer,
} from "./MovieInfo.styles";
//MovieService
import MovieService from "../../services/MovieService";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import useFetchUser from "../../helpers/FetchUser";
import { ToastContainer, toast } from "react-toastify";
import useFetchUserCollection from "../../helpers/FetchUserCollection";
import Modal from "../PopupModal/Modal";

const MovieInfo = ({ movie }) => {
  const { user, collection } = useFetchUserCollection();
  const { userWantlist, wantlist } = useFetchUser();
  const [openModal, setOpenModal] = useState(false);
  const initialMovieState = {
    tmdbID: movie.id,
    movieTitle: movie.title,
    movieImg: movie.poster_path ? movie.poster_path : null,
  };

  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
      {openModal && <Modal closeModal={setOpenModal} userId={user.id} data={initialMovieState} />}
        <Thumb
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false}
          alt="movie-thumb"
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>PLOT</h3>
          <p>{movie.overview}</p>

          <div className="rating-directors">
            <div>
              <h3>RATING</h3>
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>DIRECTOR{movie.directors.length > 1 ? "S" : ""}</h3>
              {movie.directors.map((director) => (
                <p key={director.credit_id}>{director.name}</p>
              ))}
            </div>
          </div>
          <ButtonContainer>
            <Tippy content="Add to collection" placement="bottom">
              <Button className="openModalBtn" onClick={() => {
                setOpenModal(true);
              }}>Add to collection
              </Button>
            </Tippy>
          </ButtonContainer>
        </Text>
      </Content>
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
};

export default MovieInfo;
