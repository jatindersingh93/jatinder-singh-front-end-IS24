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

export const getProduct = createAsyncThunk(
    "products/get",
    async ({ id }) => {
      await ProductsDataService.get(id);
      return { id };
    }
  ); 
export const createProduct = createAsyncThunk(
    "products/create",
    async ({ product_id, name, description, colour, size }) => {
      const res = await ProductsDataService.create({ product_id, name, description, colour, size });
      return res.data;
    }
  );
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }) => {
    const res = await ProductsDataService.update(id, data);
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
      },
      [deleteProduct.fulfilled]: (state, action) => {
        let index = state.findIndex(({ id }) => id === action.payload.id);
        state.splice(index, 1);
      },    
      [getProduct.fulfilled]: (state, action) => {
        let index = state.findIndex(({ id }) => id === action.payload.id);
        state.splice(index, 1);
      },  
      [updateProduct.fulfilled]: (state, action) => {
        const index = state.findIndex(product => product.id === action.payload.id);
        state[index] = {
          ...state[index],
          ...action.payload,
        };
      },                  
    },  
  });

const { reducer } = ProductSlice;
export default reducer;