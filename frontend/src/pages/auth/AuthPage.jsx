/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/authSlice";

const AuthPage = ({ isLogin: propIsLogin }) => {
  const [isLogin, setIsLogin] = useState(propIsLogin ?? true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(isLogin ? {} : { name: "" }),
  });
  const [loading, setLoading] = useState(false); // Track loading state

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pre-fill email if coming from signup
  if (location.state?.email && isLogin) {
    setFormData((prev) => ({ ...prev, email: location.state.email }));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/login",
          formData
        );
        const { token, data: user } = response.data;

        // Dispatch login success action to Redux
        dispatch(loginSuccess({ token, user }));

        // Store token in localStorage
        localStorage.setItem("token", token);

        // Redirect to dashboard or home page
        navigate("/dashboard");
      } else {
        // Signup logic
        const response = await axios.post(
          "http://localhost:3000/api/v1/auth/signup",
          formData
        );

        // Redirect to verify-email page with email as state
        navigate("/verify-email", { state: { email: formData.email } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // Stop loading
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
            disabled={loading} // Disable button while loading
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
        <p className="mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin((prev) => !prev)}
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
