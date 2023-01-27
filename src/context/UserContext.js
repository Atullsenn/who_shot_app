import React from "react";
import axios from "axios";
import { URL } from "../url/url";
import { toast } from "react-toastify";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, isUserType: action.UserType };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, isUserType: null };
    default: {
      return { ...state, isAuthenticated: false, isUserType: null };
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
    isUserType: localStorage.getItem("loginUserType"),
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  let url = 'http://localhost:8000/web/api/loginAdmin';
  setError(false);
  axios.post(url, {
    email: login,
    password: password
  }).then((response) => {
    if (response.data.success === "true") {
      localStorage.setItem('id_token', 1);
      localStorage.setItem('superAdminId', JSON.stringify(response.data.user.id));
      localStorage.setItem('loginUserType', JSON.stringify(response.data.user.user_type));
      localStorage.setItem('superAdminEmail', JSON.stringify(response.data.user.email));
      localStorage.setItem('superAdminName', JSON.stringify(response.data.user.name));
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS', UserType: JSON.stringify(response.data.user.type) })
      toast.success("Login Success")
      history.push('/app/dashboard')
    }
    else {
      setError(true);
      dispatch({ type: "LOGIN_FAILURE" });
      history.push("/login");
    }
  }).catch((err) => {
    toast.error("User email or password incorrect")
  });
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  localStorage.removeItem("loginUserType");
  localStorage.removeItem("superAdminId");
  localStorage.removeItem("superAdminEmail");
  localStorage.removeItem("superAdminName");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
  toast.success("Signout success")
}
