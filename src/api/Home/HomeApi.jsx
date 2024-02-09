import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

// getproducts
export const getproducts = createAsyncThunk(
  "Home/getproducts",
  async function () {
    try {
      const { data } = await axiosRequest.get("Product/get-products");
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// getcategories
export const getcategories = createAsyncThunk(
  "Home/getcategories",
  async function () {
    try {
      const { data } = await axiosRequest.get("Category/get-categories");
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
