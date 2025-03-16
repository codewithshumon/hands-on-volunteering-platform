import { useState, useRef } from "react";

const useUpdateData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null); // For request cancellation

  const updateData = async (url, method = "PUT", data = {}, options = {}) => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController for the current request
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token"); // Get authentication token
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add authentication header
          ...options.headers, // Merge custom headers
        },
        body: JSON.stringify(data),
        signal: abortControllerRef.current.signal, // Add abort signal
        ...options, // Merge other fetch options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setLoading(false);

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
      setLoading(false);
      throw err; // Re-throw the error for the caller to handle
    } finally {
      abortControllerRef.current = null; // Reset the AbortController
    }
  };

  // Function to cancel the ongoing request
  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return { updateData, loading, error, cancelRequest };
};

export default useUpdateData;
