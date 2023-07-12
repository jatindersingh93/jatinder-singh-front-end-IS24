import axios from "axios";

// Initialize axios with api calls 
export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "application/json"
    }
  });