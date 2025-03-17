/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useMemo, useCallback } from "react";

const useApi = () => {
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState(null);
  const [options, setOptions] = useState(null);
  const isCanceledRef = useRef(false);

  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const stableCustomHeaders = useMemo(() => headers, [JSON.stringify(headers)]);
  const stableOptions = useMemo(() => options, [JSON.stringify(options)]);

  // Function to make API requests
  const makeRequest = useCallback(
    async (
      endpoint,
      method = "GET",
      body = {},
      customHeaders = {},
      options = {}
    ) => {
      isCanceledRef.current = false;
      setLoading(true);
      setError(null);

      try {
        // Stabilize customHeaders and options using useMemo
        setHeaders(customHeaders);
        setOptions(options);

        // Initialize headers
        const headers = {
          Authorization: `Bearer ${token}`,
          ...stableCustomHeaders, // Use stabilized custom headers
        };

        // Conditionally add Content-Type header if body is not FormData
        if (!(body instanceof FormData)) {
          headers["Content-Type"] = "application/json";
        }

        const requestOptions = {
          method,
          headers,
          ...stableOptions, // Use stabilized options
        };

        // Add body to request options if method is POST, PUT, or PATCH
        if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
          requestOptions.body =
            body instanceof FormData ? body : JSON.stringify(body);
        }

        const response = await fetch(`${baseURL + endpoint}`, requestOptions);

        // Check if the request was canceled
        if (isCanceledRef.current) {
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setResData(result.data);

        return result; // Return the response data
      } catch (err) {
        if (!isCanceledRef.current) {
          setError(err.message || "Something went wrong!");
        }
        throw err; // Re-throw the error for the caller to handle
      } finally {
        if (!isCanceledRef.current) {
          setLoading(false);
        }
      }
    },
    [stableCustomHeaders, stableOptions, token, baseURL]
  );

  // Function to cancel the ongoing request
  const cancelRequest = useCallback(() => {
    if (isCanceledRef.current) {
      return;
    }
  }, []);

  // Function to fetch data (GET requests)
  const fetchData = useCallback(
    async (endpoint, customHeaders = {}, options = {}) => {
      return makeRequest(endpoint, "GET", null, customHeaders, options);
    },
    [makeRequest]
  );

  // Function to update data (POST, PUT, PATCH, DELETE)
  const updateData = useCallback(
    async (endpoint, method = "PUT", body = {}, options = {}) => {
      return makeRequest(endpoint, method, body, {}, options);
    },
    [makeRequest]
  );

  return {
    resData, // Response data from the API
    loading, // Loading state
    error, // Error state
    fetchData, // Function to fetch data (GET requests)
    updateData, // Function to update data (POST, PUT, PATCH, DELETE)
    cancelRequest, // Function to cancel the ongoing request
  };
};

export default useApi;
