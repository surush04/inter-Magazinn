import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
// getproductsfromcart
export const getproductsfromcart = createAsyncThunk(
  "home/getproductsfromcart",
  async function () {
    try {
      const { data } = await axiosRequest.get("Cart/get-products-from-cart");
      return data?.data[0].productsInCart;
    } catch (error) {
      console.log(error);
    }
  }
);

//addCart
export const addCart = createAsyncThunk(
  "home/addCart",
  async (id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(
        `Cart/add-product-to-cart?id=${id}`
      );
      dispatch(getproductsfromcart());
    } catch (error) {
      console.log(error);
    }
  }
);

//deleteCart
export const deleteCart = createAsyncThunk(
  "home/deleteCart",
  async (id, { dispatch }) => {
    try {
      const { data } = await axiosRequest.delete(
        "Cart/delete-product-from-cart?id=${id}"
      );
      dispatch(getproductsfromcart());
      return data.datab;
    } catch (error) {
      console.log(error);
    }
  }
);
