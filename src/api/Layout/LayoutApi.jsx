import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosRequest } from "../../utils/axiosRequest";

// getcategories
export const getcategories = createAsyncThunk(
  "Home,getcategories",
  async function () {
    try {
      let { data } = await axiosRequest.get("Category/get-categories");
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
