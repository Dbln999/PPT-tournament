import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import SignIn from "../pages/SignIn";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import SignUpPage from "../pages/SignUpPage";
import CreateGame from "../pages/CreateGame";
import TournamentPage from "../pages/TournamentPage";
import EditProfilePage from "../pages/EditProfilePage";

const AppRoutes = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  console.log(user);

  return user ? (
    <Routes>
      <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
      <Route path="/create" element={<CreateGame></CreateGame>}></Route>
      <Route path="/edit" element={<EditProfilePage></EditProfilePage>}></Route>
      <Route
        path="/tournament"
        element={<TournamentPage></TournamentPage>}
      ></Route>
      {/*<Route path="/" element={<SignIn></SignIn>}></Route>*/}
      <Route
        path="*"
        index
        element={<Navigate replace to="/profile"></Navigate>}
      ></Route>{" "}
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<SignIn></SignIn>}></Route>
      <Route path="/register" element={<SignUpPage></SignUpPage>}></Route>
      <Route path="*" element={<Navigate replace to={"/"}></Navigate>}></Route>
    </Routes>
  );
};
export default AppRoutes;
