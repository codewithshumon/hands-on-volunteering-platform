/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";

const useFetchData = (
  endpoint,
  method = "GET",
  customHeaders = {},
  options = {}
) => {
  const [user, setUser] = useState(null);
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

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseURL + endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...stableCustomHeaders, // Use memoized customHeaders
        },
        ...stableOptions, // Use memoized options
      });

      console.log("[response]", response);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log("[data]", data);

      setUser(data.data);
    } catch (err) {
      console.log("[err]", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [endpoint, method, stableCustomHeaders, stableOptions]);

  return { user, loading, error };
};

export default useFetchData;
