import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "../components/sharedVariables";

export const useUserFetch = () => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(false);

      const auth = await axios.get(`${backendURL}/auth`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      const user = await axios.get(`${backendURL}/users/${auth.data.id}`);
      // console.log(auth.data);
      // console.log(user.data);
      setState({
        ...user,
        userName: user.userName,
        collections: user.collections,
      });
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
    console.log("check");
    console.log(state);
  }, []);
  return { state, loading, error, fetchUser };
};
