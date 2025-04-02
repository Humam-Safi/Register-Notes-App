import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchUsers = createAsyncThunk("users/fetchUsers" , async ()=>{
  const res = await axios.post("${BaseUrl}/${REGISTER}")
  return res.data
})

const registerSlice = createSlice({
  initialState: JSON.parse(localStorage.getItem("users")) || [],
  name: "form",
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload); 
      localStorage.setItem("users", JSON.stringify(state)); 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled , ( action) =>{
      return action.payload
    })
  }
});

export const { addUser } = registerSlice.actions;
export default registerSlice.reducer;
