import { createSlice } from "@reduxjs/toolkit";

const tournamentSlice = createSlice({
  name: "tournament",
  initialState: {
    tournament: [],
    names: [],
    modal: true,
    start: false,
    gameStarted: false,
    winner: [],
    time: 0,
  },
  reducers: {
    createTournament(state, action) {
      if (state.tournament.length <= 0) state.tournament.push(action.payload);
      return;
    },
    addNames(state, action) {
      state.names.push(action.payload);
    },
    closeModal(state) {
      state.modal = false;
    },
    shuffle(state) {
      for (let i = state.names.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = state.names[i];
        state.names[i] = state.names[j];
        state.names[j] = temp;
      }
    },
    concatList(state, action) {
      state.names = action.payload;
    },
    startGame(state, action) {
      state.start = action.payload;
      state.gameStarted = true;
    },
    setWinner(state, action) {
      state.winner.push(action.payload);
    },
    setTime(state, action) {
      state.time = action.payload;
    },
  },
});

export default tournamentSlice.reducer;
export const {
  createTournament,
  addNames,
  closeModal,
  shuffle,
  concatList,
  startGame,
  setWinner,
  setTime,
} = tournamentSlice.actions;
