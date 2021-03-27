import axios from "axios";

const token = localStorage.getItem("token");
var authorization = "";

if (token != null) {
  authorization = "Bearer " + token.substring(1, token.length - 1);
}

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: authorization,
  },
});
