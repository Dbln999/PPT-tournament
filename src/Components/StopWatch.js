import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setTime, setWinner, startGame } from "../store/tournamentSlice";

const StopWatch = (props) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const endGame = (name) => {
    setRunning(false);
    props.startGame(false);
    props.setTime(time);
    props.setWinner(name);
  };

  return (
    <>
      <div className="modalFixed"></div>
      <div className="whiteModal d-flex flex-column">
        <h3 className="text-center">Who won?</h3>
        <div className="d-flex justify-content-center">
          <h4>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</h4>
          <h4>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</h4>
        </div>
        <div className="d-flex flex-column align-items-center">
          {props.names.map((name, idx) => {
            const color = idx % 2 === 0 ? "primary" : "success";
            return (
              <button
                className={`w-75 btn btn-${color} winnerHeight my-2 fs-5`}
                onClick={() => endGame(name)}
                key={idx}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    names: state.tournament.names,
  };
};
const mapDispatchToProps = {
  startGame,
  setWinner,
  setTime,
};
export default connect(mapStateToProps, mapDispatchToProps)(StopWatch);
