import { createSlice } from '@reduxjs/toolkit';
import { fetchAllProductData, getSingleProduct } from '../thunk';


const productSlice=createSlice({
    name:'product',
    initialState:{
        data: [],
        singleProduct:{},
        userID:[],
        loading: false,
        error: null,
    },
reducers:{
    saveUserId:(state,action)=>{
state.userID=action.payload
    }
},

    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllProductData.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchAllProductData.fulfilled,(state,action)=>{
            state.loading=false,
          state.data=action.payload.products
        })
        .addCase(fetchAllProductData.rejected,(state,action)=>{
           
            state.error = action.error.message;
        })
        .addCase(getSingleProduct.fulfilled,(state,action)=>{
            state.loading=false,
          state.singleProduct = action.payload.products
        })


    }
})
export const {saveUserId} =productSlice.actions
export default productSlice.reducer