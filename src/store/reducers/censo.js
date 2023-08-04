import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  departments: [],
  occupations: [],
  persons: [],
  graph: {},
};

export const censoSlice = createSlice({
  name: "censo",
  initialState,
  reducers: {
    setPersons: (state, action) => {
      state.persons = action.payload;
    },
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    setOccupations: (state, action) => {
      state.occupations = action.payload;
    },
    addPerson: (state, action) => {
      state.persons = [...state.persons, action.payload];
    },
    setGraph: (state, action) => {
      state.graph = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPersons,
  setDepartments,
  setOccupations,
  addPerson,
  setGraph,
} = censoSlice.actions;

export default censoSlice.reducer;
