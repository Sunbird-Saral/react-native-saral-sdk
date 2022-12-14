import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    roiData:{},
    loading: true
}

const RoiSliceData = createSlice({
    name: "roiData",
    initialState,

   reducers: {
    AllRoiData:(state, action) =>{
         state.roiData = action.payload
   },
   }
});

export const {AllRoiData} = RoiSliceData.actions;
export default RoiSliceData.reducer;