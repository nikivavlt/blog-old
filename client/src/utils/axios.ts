import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

const axiosInstanceTwo = axios.create();

export {
  axiosInstance,
  axiosInstanceTwo
}; // axios instead of this
