/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: location.state?.email || "", // Pre-fill email from route state
    code: "",
  });
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isCodeResent, setIsCodeResent] = useState(false); // Track if code is resent
  const [isResending, setIsResending] = useState(false); // Track if resend is in progress

  // Key for localStorage
  const TIMER_START_KEY = "emailVerificationTimerStart";

  // Calculate remaining time on component mount
  useEffect(() => {
    const timerStart = localStorage.getItem(TIMER_START_KEY);
    if (timerStart) {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - Number(timerStart)) / 1000); // Elapsed time in seconds
      const remainingTime = Math.max(180 - elapsedTime, 0); // Remaining time in seconds
      setTimer(remainingTime);
      setIsResendDisabled(remainingTime > 0);
    } else {
      // If no timer start is found, set the initial timestamp
      localStorage.setItem(TIMER_START_KEY, Date.now().toString());
    }
  }, []);

  // Countdown timer logic
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable resend button when timer reaches 0
      localStorage.removeItem(TIMER_START_KEY); // Clear the stored timestamp
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [timer]);

  // Automatically hide the success message after 1 minute
  useEffect(() => {
    let timeout;
    if (isCodeResent) {
      timeout = setTimeout(() => {
        setIsCodeResent(false); // Hide the message after 60 seconds
      }, 60000); // 60 seconds
    }
    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [isCodeResent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/verify-email",
        formData
      );

      // Redirect to login page with email as state
      navigate("/test/login", { state: { email: formData.email } });
    } catch (error) {
      console.error("Verification failed:", error.response?.data?.message);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true); // Start loading
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/resend-verification-code",
        { email: formData.email }
      );

      // Reset the timer to 3 minutes
      setTimer(180);
      setIsResendDisabled(true);
      setIsCodeResent(true); // Show the success message
      localStorage.setItem(TIMER_START_KEY, Date.now().toString()); // Store new initial timestamp
    } catch (error) {
      console.error("Resend failed:", error.response?.data?.message);
    } finally {
      setIsResending(false); // Stop loading
    }
  };

  // Format the timer into minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Email</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Description */}
          <div className="mb-4 text-center">
            <p className="text-gray-700">
              We have sent a verification code to your email address:
            </p>
            <p className="font-semibold text-blue-600">{formData.email}</p>
            {isCodeResent && (
              <p className="text-green-600 mt-2">
                A new code has been sent to your email.
              </p>
            )}
          </div>

          {/* Verification Code Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Verification Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter your verification code"
              required
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mb-4"
          >
            Verify
          </button>
        </form>

        {/* Timer and Resend Code Section */}
        <div className="text-center">
          {isResendDisabled ? (
            <p className="text-gray-600">
              Resend code in{" "}
              <span className="font-bold">{formatTime(timer)}</span>
            </p>
          ) : (
            <button
              onClick={handleResendCode}
              className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-300 cursor-pointer flex items-center justify-center w-full h-full"
              disabled={isResending} // Disable button while resending
            >
              {isResending ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              ) : (
                "Resend Verification Code"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
