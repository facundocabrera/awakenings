import { createSlice } from "@reduxjs/toolkit";

const aMap = createSlice({
  name: "aMap",
  initialState: {},
  reducers: {
    update: (state, { payload: { name, value } }) => {
      debugger;
      state[name] = value;
    },
  },
});

export const { update } = aMap.actions;

export default aMap.reducer;
