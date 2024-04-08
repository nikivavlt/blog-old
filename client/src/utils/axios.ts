import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blog-old-jdkj.onrender.com',
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
