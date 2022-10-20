import React, { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Context } from "../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import userImage from "../assets/user.png";
import { Link } from "react-router-dom";
import backArrow from "../assets/backArrow.png";

const EditProfilePage = () => {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [stats] = useCollectionData(
    firestore.collection(`stats-${user.uid}`).orderBy("uid")
  );

  const [form, setForm] = useState({ name: "", nickname: "", age: 0 });

  console.log(form)
  console.log(stats)

  const createCollection = async () => {
    if (
      form.name.length > 10 &&
      form.nickname !== "" &&
      form.nickname.length < 15 &&
      form.age > 7 &&
      form.age < 75 &&
      stats.length == 0
    ) {
      firestore.collection(`stats-${user.uid}`).doc("statistic").set({
        uid: user.uid,
        matches: 0,
        win: 0,
        loss: 0,
        winRate: 0,
        age: form.age,
        name: form.name,
        nickname: form.nickname,
        avatar: userImage,
      });
    } else if (
      stats.length !== 0 &&
      form.name.length > 10 &&
      form.nickname !== "" &&
      form.nickname.length < 15 &&
      form.age > 7 &&
      form.age < 75
    ) {
      firestore.collection(`stats-${user.uid}`).doc("statistic").update({
        age: form.age,
        name: form.name,
        nickname: form.nickname,
      });
    } else {
      alert("error");
    }
  };

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Link to="/">
        <img
          src={backArrow}
          alt="back button"
          className="mt-3 mx-3"
          style={{ cursor: "pointer" }}
          width="50"
        />
      </Link>
      <Container>
        <div
          className="d-flex justify-content-start mt-5 bg-profileBg flex-column align-items-center"
          style={{ borderRadius: "15px" }}
        >
          <Form className="w-75 mt-5">
            <Form.Group className="mb-3">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                className="signInForm"
                placeholder="Enter nickname"
                onChange={formHandler}
                value={form.nickname}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <div className="d-flex">
                <Form.Control
                  className="signInForm"
                  name="name"
                  placeholder="Enter your name"
                  onChange={formHandler}
                  value={form.name}
                />
              </div>
            </Form.Group>
            <Form.Group className="d-flex justify-content-center align-items-center">
              <Form.Label htmlFor="age" className="fs-6 ">
                Age:
              </Form.Label>
              <Form.Control
                type="number"
                id={"age"}
                className="mx-2 fs-4"
                name="age"
                onChange={formHandler}
                value={form.age}
                style={{
                  border: 0,
                  borderRadius: "10px",
                  width: "70px",
                }}
              ></Form.Control>
            </Form.Group>
          </Form>
          <div>
            <Button
              className="bg-blue text-black fs-5 mt-3 signBtns w-100 mb-3"
              onClick={createCollection}
            >
              Apply
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EditProfilePage;
