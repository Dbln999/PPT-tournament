import {combineReducers, configureStore} from "@reduxjs/toolkit";
import tournamentSlice from "./tournamentSlice";

const rootReducer = combineReducers({
    tournament: tournamentSlice
})

export const store = configureStore({
    reducer:rootReducer
})