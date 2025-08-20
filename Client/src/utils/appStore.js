import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../utils/authSlice";
import adminReducer from "../utils/adminSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
});

export default appStore;
