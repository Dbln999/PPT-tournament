import React, { useState } from "react";
import NavComponent from "../Components/NavComponent";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createTournament } from "../store/tournamentSlice";

const CreateGame = ({tournament,...props}) => {
  const [form, setForm] = useState({ name: "", numOfTeams: 2 });

  const changeHandler = (e) => {
    setForm({ ...form, name: e.target.value });
  };

  const numberHandler = (e) => {
    if (form.numOfTeams < 8) {
      setForm({ ...form, numOfTeams: e.target.value });
    } else {
      setForm({ ...form, numOfTeams: 2 });
    }
  };


  return (
    <>
      <NavComponent></NavComponent>
      <h3 className="text-center mt-4">Create tournament</h3>
      <Container>
        <Form>
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Tournament name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              className="signInForm"
              placeholder="Enter tournament name"
              value={form.name}
              onChange={changeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3 mt-3">
            <Form.Label>Choose number of teams</Form.Label>
            <select className="form-select" onChange={numberHandler}>
              <option value="2">2</option>
              <option value="4">4</option>
              <option value="8">8</option>
            </select>
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center">
          {form.name.length > 5 && (
            <Link
              to={`/tournament`}
              className="d-flex justify-content-center w-100 text-decoration-none"
            >
              <Button
                className="btn-success w-25"
                style={{ height: "50px" }}
                onClick={() => props.createTournament(form)}
              >
                Create!
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </>
  );
};

const mapDispatchToProps = {
  createTournament,
};


export default connect(null, mapDispatchToProps)(CreateGame);
