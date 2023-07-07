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

export const createProduct = createAsyncThunk(
    "tutorials/create",
    async ({ name, description }) => {
      const res = await ProductsDataService.create({ name, description });
      return res.data;
    }
  );

export const deleteProduct = createAsyncThunk(
    "products/delete",
    async ({ id }) => {
      await ProductsDataService.delete(id);
      return { id };
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
    [deleteProduct.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },        
  });

const { reducer } = ProductSlice;
export default reducer;