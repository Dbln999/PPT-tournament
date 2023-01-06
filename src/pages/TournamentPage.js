import React, { useState } from "react";
import NavComponent from "../Components/NavComponent";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import ModalName from "../Components/ModalName";
import {
  addNames,
  createTournament,
  startGame,
} from "../store/tournamentSlice";
import StopWatch from "../Components/StopWatch";
const TournamentPage = ({
  tournament,
  names,
  modal,
  start,
  gameStarted,
  time,
  winner,
  ...props
}) => {
  const ParticipantContainer = () => {
    let indents = [];
    for (let i = 0; i < tournament[0].numOfTeams; i++) {
      indents.push(
        <div key={i}>
          <div
            className="participantContainer mt-5 d-flex bg-blue border-0 justify-content-center align-items-center"
            key={i}
          >
            {names[i]}
          </div>
          {!modal && tournament[0].numOfTeams === 2 && i === 0 && !start && (
            <>
              <div className="vertical-line-two"></div>
              <div className="horizontal-line"></div>
            </>
          )}
          {!modal && tournament[0].numOfTeams === "4" && i % 2 === 0 && !start && (
            <>
              <div className="vertical-line"></div>
              {i === 0 && <div className="horizontal-line-left"></div>}
              {i === 2 && <div className="horizontal-line-right"></div>}
            </>
          )}
          {!modal && tournament[0].numOfTeams === "8" && i % 2 === 0 && !start && (
            <>
              <div className="vertical-line "></div>
              {i <= 2 && <div className="horizontal-line-left"></div>}
              {i > 2 && <div className="horizontal-line-right "></div>}
            </>
          )}
        </div>
      );
    }
    return indents;
  };

  const startHandler = () => {
    localStorage.setItem("tournament", JSON.stringify(tournament[0]));
    localStorage.setItem("players", JSON.stringify(names));
    props.startGame(true);
  };

  const clearHandler = () => {
    localStorage.removeItem("tournament");
    localStorage.removeItem("players");
    window.open("/profile", "_self");
  };

  return (
    <div>
      <NavComponent></NavComponent>
      {modal && <ModalName teams={tournament[0]?.numOfTeams} />}
      {start && <StopWatch></StopWatch>}
      {tournament.map((tour, i) => {
        return (
          <div key={i} className="d-flex flex-column align-items-center my-3">
            <h3>Tournament: {tour.name}</h3>
            <h3>Amount of teams: {tour.numOfTeams}</h3>
          </div>
        );
      })}
      <Row className="d-flex ">
        <Col
          className={`d-flex justify-content-around align-items-center flex-column flex-wrap height-${tournament[0]?.numOfTeams}`}
        >
          {tournament[0].numOfTeams === "8" && !modal &&  (
            <>
              <div className="semiContainer bg-blue"></div>
            </>
          )}
          {winner.length === 0 || winner.length > 1 ? (
            <ParticipantContainer />
          ) : (
            <div className="bg-green w-100 h-75 rounded-2 d-flex flex-column justify-content-center align-items-center">
              <h1 className="font-monospace">Winner is {winner[0]}</h1>
              <div className="d-flex">
                <h4>
                  Time: {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </h4>
                <h4>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</h4>
              </div>
            </div>
          )}

          {/*{modal && (*/}
          {/*  <div className="finalContainer mt-5 d-flex bg-success border-0 justify-content-center align-items-center"></div>*/}
          {/*)}*/}
          {tournament[0].numOfTeams === "8" &&!modal && (
            <div className="semiContainer-2 bg-blue"></div>
          )}
        </Col>
      </Row>
      <div className="d-flex align-items-center my-5 flex-column">
        {!modal && gameStarted === false && (
          <button
            className="bg-green border-0 rounded-3 startButton"
            onClick={startHandler}
          >
            Start
          </button>
        )}
        <button
          className="bg-danger rounded-3 border my-2 startButton"
          onClick={clearHandler}
        >
          End tournament
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tournament: state.tournament.tournament,
    names: state.tournament.names,
    modal: state.tournament.modal,
    start: state.tournament.start,
    gameStarted: state.tournament.gameStarted,
    winner: state.tournament.winner,
    time: state.tournament.time,
  };
};

const mapDispatchToProps = {
  addNames,
  createTournament,
  startGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage);
