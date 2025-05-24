import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

const VerifyPassword = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false); // Separate loading state for resend
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const [error, setError] = useState(""); // For error messages
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Control visibility of success message

  const navigate = useNavigate();

  // Countdown timer logic
  useEffect(() => {
    if (countdown > 0 && codeSent) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, codeSent]);

  // Hide success message after 1 minute
  useEffect(() => {
    let timeout;
    if (showSuccessMessage) {
      timeout = setTimeout(() => {
        setShowSuccessMessage(false); // Hide the message after 1 minute
      }, 60000); // 60 seconds
    }
    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [showSuccessMessage]);

  // Send verification code
  const handleSendCode = async () => {
    setResendLoading(true); // Start resend loading
    setError("");
    try {
      await axios.post(
        "http://localhost:3000/api/v1/auth/resend-verification-code",
        {
          email,
        }
      );
      setShowSuccessMessage(true); // Show the success message
      setCodeSent(true);
      setCountdown(180);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setResendLoading(false); // Stop resend loading
    }
  };

  // Verify the code
  const handleVerifyCode = async () => {
    setLoading(true); // Start verification loading
    setError("");
    try {
      await axios.post("http://localhost:3000/api/v1/auth/verify-email", {
        email,
        code: verificationCode,
      });
      setCodeVerified(true);
      setShowSuccessMessage(false);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid verification code");
    } finally {
      setLoading(false); // Stop verification loading
    }
  };

  // Update password
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await axios.post("http://localhost:3000/api/v1/auth/reset-password", {
        email,
        newPassword,
      });

      navigate("/login", { state: { email } }); // Redirect to login with email
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-[30vw] mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Reset Password
        </h2>
        <div className="mt-4">
          {/* Email Input (Hidden after code is sent) */}
          {!codeSent && (
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaEnvelope className="text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-2 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {/* Success Message (After code is sent) */}
          {codeSent && (
            <div className="mb-4 text-center">
              <p className="text-gray-700">
                We have sent a verification code to your email address:
              </p>
              <p className="font-semibold text-gray-700">{email}</p>
              {showSuccessMessage && (
                <p className="text-green-600 mt-2">
                  A new code has been sent to your email.
                </p>
              )}
            </div>
          )}

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Send Verification Code Button */}
          {!codeSent ? (
            <button
              onClick={handleSendCode}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={resendLoading}
            >
              {resendLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                "Send Verification Code"
              )}
            </button>
          ) : (
            <>
              {/* Verification Code Input (Hidden after code is verified) */}
              {!codeVerified && (
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Verification Code
                  </label>
                  <div className="flex items-center border rounded-lg p-2">
                    <FaLock className="text-gray-500" />
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter verification code"
                      className="w-full px-2 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Verify Code Button (Hidden after code is verified) */}
              {!codeVerified && (
                <button
                  onClick={handleVerifyCode}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    "Verify Code"
                  )}
                </button>
              )}

              {/* Resend Code Section (Hidden after code is verified) */}
              {!codeVerified && countdown > 0 && (
                <p className="mt-4 text-gray-600 text-center">
                  Resend code in {Math.floor(countdown / 60)}:
                  {countdown % 60 < 10 ? `0${countdown % 60}` : countdown % 60}
                </p>
              )}
              {!codeVerified && countdown === 0 && (
                <button
                  onClick={handleSendCode}
                  className="mt-2 text-blue-500 hover:text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-lg transition duration-300 cursor-pointer flex items-center justify-center w-full h-full"
                  disabled={resendLoading}
                >
                  {resendLoading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    "Resend Verification Code"
                  )}
                </button>
              )}

              {/* New Password Input (Shown after code is verified) */}
              {codeVerified && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">New Password</label>
                    <div className="flex items-center border rounded-lg p-2">
                      <FaLock className="text-gray-500" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        className="w-full px-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Confirm Password
                    </label>
                    <div className="flex items-center border rounded-lg p-2">
                      <FaLock className="text-gray-500" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="w-full px-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Update Password Button */}
                  <button
                    onClick={handleUpdatePassword}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                      </div>
                    ) : (
                      "Update Password"
                    )}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPassword;
