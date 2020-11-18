import axios from "axios";
import { API_URL } from "../app.const";

const api_url = `${API_URL}/auth/`;

const register = (username: string, email: string, password: string, dob: string, gender: number) => {
  return axios.post(api_url + "signup", JSON.stringify({
    Name: username,
    Email: email,
    Password: password,
    DOB: dob,
    Gender: gender,
  }), { headers: { 'Content-Type': 'application/json', } });
};

const login =  (email: string, password: string) => {
  return axios
    .post(api_url + "signin", JSON.stringify({
      Email: email,
      Password: password,
    }), { headers: { 'Content-Type': 'application/json', } })
    .then((response) => {
      if (response.data.token) {
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
  return JSON.parse(localStorage.getItem("user") as string);
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
