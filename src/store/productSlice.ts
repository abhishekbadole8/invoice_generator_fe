import { createSlice } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  quantity: Number;
  rate: Number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    clearProducts(state) {
      state.products = [];
    },
  },
});

export const { addProduct, clearProducts } = productSlice.actions;

export default productSlice.reducer;
