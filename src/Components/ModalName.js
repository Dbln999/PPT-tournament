import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addNames, closeModal, shuffle } from "../store/tournamentSlice";

function ModalName({ teams, ...props }) {
  const [playerForm, setPlayerForm] = useState("");

  const [amountOfClicks, setAmountOfClicks] = useState(0);

  useEffect(() => {
    if (amountOfClicks === Number(teams)) {
      props.shuffle();
      props.closeModal();

    }
  }, [amountOfClicks, teams]);

  const nextButtonHandler = () => {
    props.addNames(playerForm);
    setPlayerForm("");
    setAmountOfClicks((prev) => prev + 1);
  };

  return (
    <>
      <div className="modalFixed" onClick={props.closeModal}></div>
      <div className="whiteModal d-flex flex-column">
        <h3>Add players names</h3>
        <div className="d-flex flex-column justify-content-center align-items-center">
        <input
          type="text"
          className="form-control"
          value={playerForm}
          onChange={(e) => setPlayerForm(e.target.value)}
        />
        <button
          className="w-50 btn btn-success my-2"
          onClick={nextButtonHandler}
        >
          Next
        </button>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  closeModal,
  addNames,
  shuffle,
};


export default connect(null, mapDispatchToProps)(ModalName);
