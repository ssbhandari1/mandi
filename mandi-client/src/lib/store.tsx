import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/cartSlice";
import ProductReducer from "./slices/productSlice";
const store = configureStore({
  reducer: {
    allProduct:ProductReducer,
    cartData: CartReducer,
    // orderData:orderReducer,
    // userInfoData:userReducer
  },
});

export default store;
