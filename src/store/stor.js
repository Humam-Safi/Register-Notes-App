import {  configureStore } from "@reduxjs/toolkit";
import notesSlice from "./Slices/notesSlice";
import registerSlice from "./Slices/registerSlice";

const reducers = {
  notes: notesSlice,
  form: registerSlice,
};

export const store = configureStore({
  reducer: reducers,
});
