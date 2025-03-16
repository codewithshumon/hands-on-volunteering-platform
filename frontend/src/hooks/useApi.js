import { useState, useRef, useMemo } from "react";

const useApi = () => {
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null); // For request cancellation

  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Function to make API requests
  const makeRequest = async (
    endpoint,
    method = "GET",
    body = {}, // Renamed from `data` to `body`
    customHeaders = {},
    options = {}
  ) => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      // Stabilize customHeaders and options using useMemo
      const stableCustomHeaders = useMemo(
        () => customHeaders,
        [JSON.stringify(customHeaders)]
      );
      const stableOptions = useMemo(() => options, [JSON.stringify(options)]);

      const requestOptions = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...stableCustomHeaders, // Use stabilized custom headers
        },
        signal: abortControllerRef.current.signal, // Add abort signal
        ...stableOptions, // Use stabilized options
      };

      // Add body to request options if method is POST, PUT, or PATCH
      if (["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(`${baseURL + endpoint}`, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setResData(result.data);

      // Call the success callback if provided
      if (options.onSuccess) {
        options.onSuccess(result);
      }

      return result; // Return the response data
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Something went wrong!");
        // Call the error callback if provided
        if (options.onError) {
          options.onError(err);
        }
      }
      throw err; // Re-throw the error for the caller to handle
    } finally {
      setLoading(false);
      abortControllerRef.current = null; // Reset the AbortController
    }
  };

  // Function to cancel the ongoing request
  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  // Automatically fetch data for GET requests
  const fetchData = async (endpoint, customHeaders = {}, options = {}) => {
    return makeRequest(endpoint, "GET", null, customHeaders, options);
  };

  // Function to update data (POST, PUT, PATCH, DELETE)
  const updateData = async (
    endpoint,
    method = "PUT",
    body = {},
    options = {}
  ) => {
    return makeRequest(endpoint, method, body, {}, options);
  };

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
