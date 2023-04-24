import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
    reducer: {productReducer, cartReducer}
  })
  
export default store;