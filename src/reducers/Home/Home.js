import { addCart, getproductsfromcart } from "../../api/Basket/BasketApi";
import { getcategories, getproducts } from "../../api/Home/HomeApi";
import { createSlice } from "@reduxjs/toolkit";

let Home = createSlice({
  name: "Home",
  initialState: {
    data: [],
    data2: [],
    data3: [],
    loading: false,
    subData: [],
    cart: [],
  },
  reducers: {
    setSubData: (state, value) => {
      state.subData = value.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getproducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getproducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getproducts.rejected, (state, action) => {
      state.loading.false;
    });
    // get-categories
    builder.addCase(getcategories.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getcategories.fulfilled, (state, action) => {
      state.loading = false;
      state.data2 = action.payload;
    });
    builder.addCase(getcategories.rejected, (state, action) => {
      state.loading.false;
    });

    // getproductsfromcart
    builder.addCase(getproductsfromcart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getproductsfromcart.fulfilled, (state, action) => {
      state.loading = false;
      state.data3 = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getproductsfromcart.rejected, (state, action) => {
      state.loading.false;
    });
    //addCart
    builder.addCase(getCart.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.loading = false;
      state.cart = action.payload;
    });
  },
});

export default Home.reducer;
export const { setSubData } = Home.actions;
