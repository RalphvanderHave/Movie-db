import axios from "axios";

export default axios.create({
    baseURL: "https://featherweightheroes.azurewebsites.net",
    headers: {
        "Content-type": "application/json"
    }
});