import axios from "axios";

export const verifyToken = async () => {
  const token = localStorage.getItem("token");
  return axios.get("/api/v1/auth/verify-token", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
