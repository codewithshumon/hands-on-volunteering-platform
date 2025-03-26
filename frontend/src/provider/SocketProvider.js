import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const isConnected = useSelector((state) => state.socket.isConnected);

  // Connect socket when user is available
  useEffect(() => {
    if (currentUser?._id && !isConnected) {
      dispatch({ type: "socket/connect", payload: currentUser._id });
    }

    return () => {
      if (isConnected) {
        dispatch({ type: "socket/disconnect" });
      }
    };
  }, [currentUser?._id, dispatch, isConnected]);

  // Auto-reconnect logic
  useEffect(() => {
    if (!isConnected && currentUser?._id) {
      const timer = setTimeout(() => {
        dispatch({ type: "socket/connect", payload: currentUser._id });
      }, 5000); // Try to reconnect after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isConnected, currentUser?._id, dispatch]);

  return children;
};

export default SocketProvider;
