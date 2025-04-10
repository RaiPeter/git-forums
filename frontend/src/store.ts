import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/slices/authReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
