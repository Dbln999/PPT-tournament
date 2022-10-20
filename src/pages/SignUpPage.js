import React, { useContext, useState } from "react";
import { Context } from "../index";
import { Form, Container, Button, Row } from "react-bootstrap";
import eye from "../assets/eye.png";
import backArrow from "../assets/backArrow.png";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { auth } = useContext(Context);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [type, setType] = useState("password");

  const typeHandler = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const passwordChecking = () => {
    if (form.password === form.confirm) {
      return signUp();
    } else {
      console.error("error");
    }
  };

  const signUp = async () => {
    await auth.createUserWithEmailAndPassword(form.email, form.password);
    window.open('/', '_self')
  };

  return (
    <>
      <Link to="/">
        <img
          src={backArrow}
          alt="back button"
          className="mt-4 mx-4"
          style={{ cursor: "pointer" }}
          width="50"
        />
      </Link>
      <h1 className="text-center fst-italic pt-3">Registration</h1>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              className="signInForm"
              placeholder="Enter email"
              onChange={formHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="d-flex">
              <Form.Control
                type={type}
                className="signInForm"
                name="password"
                placeholder="Password"
                onChange={formHandler}
              />
              <img src={eye} id="passwordEye" alt="" onClick={typeHandler} />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="d-flex">
              <Form.Control
                type={type}
                className="signInForm"
                name="confirm"
                placeholder="Confirm"
                onChange={formHandler}
              />
              <img src={eye} id="passwordEye" alt="" onClick={typeHandler} />
            </div>
          </Form.Group>
        </Form>

        <Row className="d-flex justify-content-center">
          <Button
            className="bg-blue text-black fs-5 mt-3 signBtns w-25"
            onClick={passwordChecking}
          >
            Sign up
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default SignUpPage;
