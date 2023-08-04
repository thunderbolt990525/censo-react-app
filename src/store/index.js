import { configureStore } from "@reduxjs/toolkit";
import censoSlice from "./reducers/censo";

export const store = configureStore({
  reducer: {
    censo: censoSlice,
  },
});
