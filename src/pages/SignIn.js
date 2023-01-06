import React, { useState, useContext } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import google from "../assets/google.png";
import menu from "../assets/menu.png";
import eye from "../assets/eye.png";
import { Context } from "../index";
import { Link } from "react-router-dom";

const SignIn = () => {
  const languages = [
    { title: "English", id: 0, current: true, href: "/" },
    { title: "Русский", id: 1, current: false, href: "/rus" },
    { title: "Eesti", id: 2, current: false, href: "/est" },
  ];

  const [type, setType] = useState("password");

  const typeHandler = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const [form, setForm] = useState({ email: "", password: "" });

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { auth, firebase } = useContext(Context);

  const signInWithEmail = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(form.email, form.password);
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await auth.signInWithPopup(provider);
  };

  return (
    <>
      <Navbar bg="lightblue p-4 " expand="md">
        <Navbar.Toggle aria-controls="burgerCollpase" className="toggle">
          <img src={menu} alt="" />
        </Navbar.Toggle>
        <Navbar.Collapse id="burgerCollpase">
          <Nav className="w-100 d-flex justify-content-center align-items-center">
            <Row className="w-50">
              {languages.map((lang) => {
                const currentLanguage = lang.current ? "primary" : "dark";
                return (
                  <Col md="4" key={lang.id}>
                    <Nav.Link
                      href={lang.href}
                      className={`fs-4 text-center text-${currentLanguage}`}
                      id={"lang"}
                    >
                      {lang.title}
                    </Nav.Link>
                  </Col>
                );
              })}
            </Row>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <h1 className="text-center mt-4 fst-italic">PPT</h1>
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
          <Row className="d-flex justify-content-center align-items-center btnRowContainer">
            <Col md="3" className="d-flex justify-content-center my-2">
              <Link to="/register">
                <Button className="bg-blue text-black fs-5 signBtns">
                  Sign up
                </Button>
              </Link>
            </Col>
            <Col md="3" className="d-flex justify-content-center my-2">
              <Button
                className="bg-green text-black fs-5 signBtns"
                onClick={signInWithEmail}
              >
                Sign in
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="text-center my-5">
          <h4 className="text-black">Continue with</h4>
          <img
            src={google}
            onClick={signInWithGoogle}
            alt="sign in with google"
            className="googleIcon"
          />
        </div>
      </Container>
    </>
  );
};

export default SignIn;
