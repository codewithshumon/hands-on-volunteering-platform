import { useState, useEffect } from "react";
import axios from "axios";

// Create an Axios instance with the base URL from the environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const useFetchData = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("[useFetchData useEffect] Running...");
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const config = {
          ...options,
          headers: {
            ...options.headers,
            ...headers,
          },
        };

        const response = await api(endpoint, config);

        if (response.status >= 200 && response.status < 300) {
          setData(response.data);
          setSuccess(true);
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (err) {
        setError(err.message || "An error occurred");
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options]);

  return { data, loading, error, success };
};

export default useFetchData;
