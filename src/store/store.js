import { configureStore } from "@reduxjs/toolkit";
import Home from "../reducers/Home/Home";
// import Layout from "../Layout/Layout";

export const store = configureStore({
  reducer: {
    Home,
    // Layout,
  },
});
