import axios from "axios";

const API_URL = "http://localhost:8000/auth/";

const register = (username: string, email: string, password: string) => {
  console.log(username);  
  return axios.post(API_URL + "signup", JSON.stringify({
    Name: username,
    Email: email,
    Password: password,
  }), { headers: { 'Content-Type': 'application/json', } });
};

const login = (email: string, password: string) => {
  console.log(email + "  " + password)
  return axios
    .post(API_URL + "signin", JSON.stringify({
      Email: email,
      Password: password,
    }), { headers: { 'Content-Type': 'application/json', } })
    .then((response) => {
      if (response.data.token) {
        console.log(response);
        console.log("token: " + response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    }, (error) => {
      return null;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  console.log(localStorage.getItem("user"));
  return JSON.parse(localStorage.getItem("user") as string);
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
