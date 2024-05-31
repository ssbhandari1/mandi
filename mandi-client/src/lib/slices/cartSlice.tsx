import { createSlice } from '@reduxjs/toolkit';
import { fetchAddToCartProduct, getAllAddProductLength } from '../thunk';


const cartSlice = createSlice({
    name: 'cartData',
    initialState: {
        data: [],
        addCartData: [],
        addToCartLength:{},
        orderData:{},
        loading:false,
        error:false

    },
    reducers: {
        saveCartData: (state, action) => {
          console.log('hhheee',action.payload)
            state.orderData = action.payload
        },
        removeCartData: (state, action) => {
            state.data=state.data.filter((item)=>item._id!==action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAddToCartProduct.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(fetchAddToCartProduct.fulfilled,(state,action)=>{
            state.loading=false,
          state.addCartData=action.payload.addProducts
        })
        .addCase(fetchAddToCartProduct.rejected,(state,action)=>{
            state.loading=false,
            state.error = action.error.message;
        })
        .addCase(getAllAddProductLength.fulfilled,(state,action)=>{
            state.loading=false,
            state.addToCartLength = action.payload
        })

    }


})
export const { saveCartData ,removeCartData} = cartSlice.actions

export default cartSlice.reducer