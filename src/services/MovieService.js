import axios from "axios";
import { backendURL } from "../components/sharedVariables";
import { toast } from "react-toastify";

const addMovieToWantList = ({ data, userWantlist }) => {
  return axios
    .post(`${backendURL}/movies`, {
      tmdbID: data.tmdbID,
      movieImg: data.movieImg,
      movieTitle: data.movieTitle,
    })
    .then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        axios
          .post(`${backendURL}/collectionsMovies`, {
            collectionID: userWantlist.collections[1].id,
            movieID: response.data.id,
          })
          .then((response) => {
            setTimeout(() => {
              toast.info(response.data.message);
            }, 500);
          });
      }
    });
};

// const removeFromWantList = (id) => {
//   return http.delete(`/wantlist/movies/${id}`);
// };

const addMovieToCollection = ({ data, user }) => {
  return axios
    .post(`${backendURL}/movies`, {
      tmdbID: data.tmdbID,
      movieImg: data.movieImg,
      movieTitle: data.movieTitle,
    })
    .then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        axios
          .post(`${backendURL}/collectionsMovies`, {
            collectionID: user.collections[0].id,
            movieID: response.data.id,
          })
          .then((response) => {
            setTimeout(() => {
              toast.info(response.data.message);
            }, 500);
          });
      }
    });
};

const MovieService = {
  //   getAllWantList,
  addMovieToWantList,
  //   removeFromWantList,
  addMovieToCollection,
};

export default MovieService;
