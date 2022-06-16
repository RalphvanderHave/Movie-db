import { useEffect, useState } from "react";
import axios from "axios";
import { backendURL } from "../components/sharedVariables";

const useFetchUser = () => {
  const [userWantlist, setUserWantList] = useState("");
  const [collections, setCollections] = useState([]);
  const [wantlist, setWantlist] = useState("");
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
                  setUserWantList(responseUser.data);
                }
              })
              .then(setCollections(userWantlist.collections))
              .then(setWantlist(collections[1]))
              .then(setLoading(false));
          }
        });
    } catch (error) {
      console.error(error);
    }
    if (loading) return;
  }, []);

  return {
    userWantlist,
    wantlist,
    collections,
    loading,
  };
};

export default useFetchUser;
