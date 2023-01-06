import React, { useContext, useState } from "react";
import menu from "../assets/menu.png";
import { Link } from "react-router-dom";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
const NavComponent = () => {
  const [toggleClassName, setToggleClassName] = useState("");
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  const [stats] = useCollectionData(firestore.collection(`stats-${user.uid}`));

  let list = [
    { id: 0, href: "/tournament", title: "Rejoin Tournament" },
    { id: 1, href: "/create", title: "Create Tournament" },
    { id: 2, href: "/friends", title: "Friends" },
    { id: 3, href: "/history", title: "Match History" },
  ];
  const signOut = async () => {
    await auth.signOut();
  };

  const tournament = useSelector((state) => state.tournament.tournament);

  if (tournament.length === 0) list = list.filter((l) => l.id > 0);

  const toggle = () => {
    if (toggleClassName === "") {
      setToggleClassName("menuDisplayed");
    } else {
      setToggleClassName("");
    }
  };

  return (
    <div id="wrapper" className={`${toggleClassName} b-bottom`}>
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <Link to="/profile" className="text-decoration-none ">
            <li className="d-flex justify-content-between align-items-center b-bottom">
              <div className="ava d-flex justify-content-center align-items-center">
                <img src={stats?.map((st) => st.avatar)} alt="" width="50" />
              </div>
              <p className="text-black w-75  fs-5">
                {stats?.map((st) => st.nickname)}
              </p>
            </li>
          </Link>
          {list.map((el) => {
            return (
              <Link
                to={el.href}
                key={el.id}
                className="text-decoration-none text-black fs-5 "
              >
                <li className={"b-bottom"}>{el.title}</li>
              </Link>
            );
          })}
          <Link to="/" className="text-decoration-none text-black">
            <li
              className="b-bottom fs-5"
              onClick={signOut}
              style={{ cursor: "pointer" }}
            >
              Sign Out
            </li>
          </Link>
        </ul>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span className="btn" id="menu-toggle" onClick={toggle}>
          <img src={menu} alt="burger menu" />
        </span>
        <Link to="/profile">
          <img
            src={stats?.map((st) => st.avatar)}
            alt=""
            width="50"
            height="50"
            className="mx-5 bg-profileBg"
            style={{ borderRadius: "50%" }}
          />
        </Link>
      </div>
    </div>
  );
};

export default NavComponent;
