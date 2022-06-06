import axios from "axios";

const $axios = axios.create({
  baseURL: "https://szamok-backend.herokuapp.com/",
});

export default $axios;
