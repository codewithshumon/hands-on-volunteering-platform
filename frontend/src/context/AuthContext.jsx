import { createContext, useEffect, useReducer } from "react";

const initialState = {
  //here user is JSON-STRING so make is object first
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  role: localStorage.getItem("role") || null,
  token: localStorage.getItem("token") || null,
};

const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        role: null,
        token: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };

    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  //for store loging data. to avoid remove user info by refresh
  useEffect(() => {
    //here user is JSON-OBJECT so make it string first
    localStorage.user = JSON.stringify(state.user);
    localStorage.token = state.token;
    localStorage.role = state.role;
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        role: state.role,
        token: state.token,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
