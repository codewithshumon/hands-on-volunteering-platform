/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

import { loginSuccess } from "../../store/slices/authSlice";

const AuthPage = ({ isLoginPage }) => {
  const [isLogin, setIsLogin] = useState(isLoginPage);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(isLogin ? {} : { name: "" }),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use useEffect to update formData when location.state?.email changes
  useEffect(() => {
    if (location.state?.email && isLogin) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state?.email, isLogin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const isLoginHandler = () => {
    setIsLogin((prev) => !prev);
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          formData
        );

        // Check if email is not verified
        if (response.data.status === "error" && response.data.email) {
          // Redirect to verify email page with the email
          navigate("/verify-email", { state: { email: response.data.email } });
          return;
        }

        const { token, data: user } = response.data;

        dispatch(loginSuccess({ token, user }));
        localStorage.setItem("token", token);

        navigate("/dashboard");
      } else {
        // Signup logic
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/signup",
          formData
        );

        // Check if email is not verified
        if (response.data.status === "error" && response.data.email) {
          // Redirect to verify email page with the email
          navigate("/verify-email", { state: { email: response.data.email } });

          return;
        }

        // Store the timer start time in localStorage
        localStorage.setItem(
          "emailVerificationTimerStart",
          Date.now().toString()
        );

        navigate("/verify-email", { state: { email: formData.email } });
      }
    } catch (error) {
      // Handle 401 Unauthorized response
      if (error.response?.status === 401 && error.response?.data?.email) {
        // Redirect to verify email page with the email
        navigate("/verify-email", {
          state: { email: error.response.data.email },
        });

        // Store the timer start time in localStorage
        localStorage.setItem(
          "emailVerificationTimerStart",
          Date.now().toString()
        );
        return;
      }

      // Handle other errors
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-[-30px] flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="max-w-lg w-[30vw] mx-auto bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Error and Success Messages */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaUser className="text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-2 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border rounded-lg p-2">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex items-center border rounded-lg p-2">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-2 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        {isLogin && (
          <p className="mt-4 text-gray-600">
            <button
              onClick={() => navigate("/verify-password")}
              className="text-blue-600 font-semibold hover:underline"
            >
              Forgot Password?
            </button>
          </p>
        )}
        <p className="mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={isLoginHandler}
            className="text-blue-600 font-semibold ml-2 hover:underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthPage;
