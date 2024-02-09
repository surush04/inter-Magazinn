import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";
// getproductsfromcart
export const getproductsfromcart = createAsyncThunk(
  "getproductsfromcart",
  async function () {
    try {
      const { data } = await axiosRequest.get("Cart/get-products-from-cart");
      console.log(data);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

//addCart 
export const addCart = createAsyncThunk('home/addCart',
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post(`Cart/add-product-to-cart?id=${id}`)
            // console.log(data);
            dispatch(getCart())
        } catch (error) {
            console.log(error);
        }
    }
)



