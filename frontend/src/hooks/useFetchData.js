/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";

const useFetchData = (
  endpoint,
  method = "GET",
  body = null, // Add body parameter for POST/PUT/PATCH requests
  customHeaders = {},
  options = {}
) => {
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Memoize customHeaders and options to prevent unnecessary re-renders
  const stableCustomHeaders = useMemo(
    () => customHeaders,
    [JSON.stringify(customHeaders)]
  );
  const stableOptions = useMemo(() => options, [JSON.stringify(options)]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const requestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...stableCustomHeaders, // Use memoized customHeaders
        },
        ...stableOptions, // Use memoized options
      };

      // Add body to request options if method is POST, PUT, or PATCH
      if (body && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(`${baseURL + endpoint}`, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to fetch/update data");
      }

      const data = await response.json();
      setResData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically fetch data only for GET requests
    if (method.toUpperCase() === "GET") {
      fetchData();
    }
  }, [endpoint, method, stableCustomHeaders, stableOptions]);

  // Return fetchData function for manual triggering (e.g., for POST/PUT/PATCH/DELETE)
  return { resData, loading, error, fetchData };
};

export default useFetchData;
