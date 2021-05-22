import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./reduser";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
