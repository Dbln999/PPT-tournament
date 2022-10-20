import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "@firebase/storage";
import { Provider } from "react-redux";
import { store } from "./store/store";

firebase.initializeApp({
  apiKey: "AIzaSyDNgtMvJb1Mk9ZYZya7_qUciDqxSFl7nzw",
  authDomain: "ppt-newdata.firebaseapp.com",
  projectId: "ppt-newdata",
  storageBucket: "ppt-newdata.appspot.com",
  messagingSenderId: "45841938000",
  appId: "1:45841938000:web:7ccefcc174dcb6bf2a0355",
});

export const Context = createContext(null);
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = getStorage(firebase.App, "ppt-newdata.appspot.com");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Context.Provider value={{ firebase, firestore, auth, storage }}>
        <App />
      </Context.Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
