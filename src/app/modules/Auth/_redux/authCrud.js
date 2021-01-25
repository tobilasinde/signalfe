import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

export function login(email, password) {
  return axios.post(API_URL, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(API_URL+'/signup', { email, fullname, username, password });
}
