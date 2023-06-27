import { createSlice } from "@reduxjs/toolkit";

const initialState = { orderSummary: false };

const ordersSlice = createSlice({
  name: "orders-slice",
  initialState,
  reducers: {},
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice;
