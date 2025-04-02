import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("items")) || [],
  name: "notes",
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("items", JSON.stringify(state));
    },
    deleteNote: (state, action) => {
      const updatedState = state.filter((note) => note.id !== action.payload);
      localStorage.setItem("items", JSON.stringify(updatedState));
      console.log(state);
      return updatedState;
    },
    updateNote: (state, action) => {
      const index = state.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem("items", JSON.stringify(state));
      }
    },
  },
});
export const { addNote, deleteNote, updateNote } =
  notesSlice.actions;
export default notesSlice.reducer;
