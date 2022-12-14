import { configureStore } from "@reduxjs/toolkit";
import RoiSliceData from "./Reducers/RoidataReducer";
export const store = configureStore({
    reducer: {
        RoiSliceData
    },
   
})