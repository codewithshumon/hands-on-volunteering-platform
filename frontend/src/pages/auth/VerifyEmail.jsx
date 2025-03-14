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
  const [showResendButton, setShowResendButton] = useState(false); // Show resend button after timer ends
  const [isResending, setIsResending] = useState(false); // Track if resend is in progress
  const [error, setError] = useState(""); // State for error messages
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message

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
      setShowResendButton(remainingTime <= 0); // Show resend button if timer has ended

      // Start the countdown if there's remaining time
      if (remainingTime > 0) {
        const interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer > 0) {
              return prevTimer - 1;
            } else {
              clearInterval(interval);
              setShowResendButton(true); // Show resend button when timer reaches 0
              localStorage.removeItem(TIMER_START_KEY); // Clear the stored timestamp
              return 0;
            }
          });
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on unmount
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/verify-email",
        formData
      );

      // Redirect to login page with email as state
      navigate("/login", { state: { email: formData.email } });
    } catch (error) {
      // Set error message from the API response
      setError(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    }
  };

  const handleResendCode = async () => {
    setIsResending(true); // Start loading
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/resend-verification-code",
        { email: formData.email, purpose: "email-verification" }
      );

      // Reset the timer to 3 minutes
      setTimer(180);
      setShowResendButton(false); // Hide resend button
      localStorage.setItem(TIMER_START_KEY, Date.now().toString()); // Store new initial timestamp

      // Show success message
      setShowSuccessMessage(true);

      // Start the countdown again
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setShowResendButton(true); // Show resend button when timer reaches 0
            localStorage.removeItem(TIMER_START_KEY); // Clear the stored timestamp
            return 0;
          }
        });
      }, 1000);
    } catch (error) {
      // Set error message from the API response
      setError(
        error.response?.data?.message ||
          "Failed to resend code. Please try again."
      );
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

  // Automatically hide the success message after 1 minute
  useEffect(() => {
    if (showSuccessMessage) {
      const timeout = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 60000); // 1 minute in milliseconds

      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }
  }, [showSuccessMessage]);

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
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <p className="text-green-600 my-2">
              A new code has been sent to your email.
            </p>
          )}

          {/* Verification Code Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Verification Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your verification code"
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
          {!showResendButton ? (
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
