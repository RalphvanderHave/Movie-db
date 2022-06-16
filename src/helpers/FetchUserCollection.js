import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../components/sharedVariables";

const useFetchUser = () => {
  const [user, setUser] = useState("");
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  useEffect(() => {
    try {
      axios
        .get(`${backendURL}/auth`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if (response.data.error) {
            console.log(response.data.error);
          } else {
            axios
              .get(`${backendURL}/users/${response.data.id}`)
              .then((responseUser) => {
                if (responseUser.data.error) {
                  console.log(responseUser.data.error);
                } else {
                  setUser(responseUser.data);
                }
              })
              .then(setCollections(user.collections))
              .then(setCollection(collections[0]))
              .then(setLoading(false));
          }
        });
    } catch (error) {
      console.error(error);
    }
    if (loading) return;
  }, []);

  return {
    user,
    collection,
    collections,
    loading,
  };
};

export default useFetchUser;
