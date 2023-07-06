import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsDataService from "../services/product.services";

const initialState = [];

export const retrieveProducts = createAsyncThunk(
    "products/retrieve",
    async () => {
      const res = await ProductsDataService.getAll();
      return res.data;
    }

    );

    const ProductSlice = createSlice({
        name: "products",
        initialState,
        extraReducers: {
          [retrieveProducts.fulfilled]: (state, action) => {
            return [...action.payload];
          }
        },
      });

const { reducer } = ProductSlice;
export default reducer;