import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchData } from './ProductsAPI';

const initialState = {
  products: [],
  cardData: []
};

export const asyncData = createAsyncThunk(
    'products/fetchData',
    async () => {
      const response = await fetchData();
      return response;
    }
  );

export const productsSlice = createSlice({
  name: 'profileName',
  initialState,
  reducers: {
    setCardData: (state, action) => {
      state.cardData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncData.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const { setCardData } = productsSlice.actions;
export const selectApi = (state) => state.products.products;
export const selectCardData = (state) => state.products.cardData;


export default productsSlice.reducer;
