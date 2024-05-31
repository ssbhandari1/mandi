// get All products
import { isAuthenticate } from "@/app/mandi/page";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const accessToken = window.localStorage.getItem("accessToken");
export const refreshToken = window.localStorage.getItem("refreshToken");

export const Base_url = " http://localhost:8080";

export const fetchAllProductData = createAsyncThunk(
  "product/fetchAllProductData",
  async () => {
    try {
      const res = await axios.get(`${Base_url}/api/v1/product/latest`);
      console.log("ressssss", res.data);
      return res.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

//Add to cart product
export const addToCartProduct = createAsyncThunk(
  "cartData/addToCartProduct",
  async (productId: string) => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/addToCart/cart`,
        {
          productId,
          userId: "6658b6d239cd29c177844e5f"
        }
      );
      console.log("HFDDDD", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
);
// export const fetchAllProductData: any = async () => {
//   try {
//     const res = await axios.get(`${Base_url}/api/v1/product/latest`);
//     console.log("ressssss", res.data);
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// };
// http://localhost:8080/api/v1/product/65f8991694b1e12fd41c7adc?id=65f5e5733ea091066d7e3d1a
// export const deleteProduct = async(productId)=>{
//     const userId = '66030f0c08d73bb1efbf5428'
//     try {
//         const res = await axios.delete(`${Base_url}/api/v1/product/${productId}?id=${userId}`);
//         return res.data
//     } catch (error) {
//         throw error;
//     }
// }

// handle quantity of add to cart product
export const fetchCartQuantity = createAsyncThunk(
  "cartData/fetchCartQuantity",
  async ({ productId, action }) => {
    console.log("DDGDGD", { productId, action });
    try {
      const res = await axios.put(`${Base_url}/api/v1/addToCart/cartQuantity`, {
        productId,
        action,
      }
    );
      console.log("SDJAJA", res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (productId: string) => {
    try {
      const res = await axios.get(`${Base_url}/api/v1/product/${productId}`);
      return res.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

// export const updateProduct = async(productId, formData)=>{
//     const userId = '66030f0c08d73bb1efbf5428'
//     try {
//         const res = await axios.put(`${Base_url}/api/v1/product/${productId}?id=${userId}`, formData);
//         return res.data
//     } catch (error) {
//         throw error;
//     }
// }
// const res = await axios.post(
//     `http://localhost:8080/api/v1/product/new?id=65f5e5733ea091066d7e3d1a`,
//     formData
//   );

export const fetchAddToCartProduct = createAsyncThunk(
  "cartData/fetchAddToCartProduct",
  async (userId: string) => {
    console.log(userId);
    try {
      const res = await axios.get(`${Base_url}/api/v1/addToCart/product`, {
        params: { userId:"6658b6d239cd29c177844e5f" }
      });
      console.log('fetchAddToCartProduct',res)
      return res.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

//Get carts items length
export const getAllAddProductLength = createAsyncThunk(
  "cartData/getAddProduct",
  async (userId) => {
    try {
      const res = await axios.get(`${Base_url}/api/v1/addToCart/userProduct`, {
        params: {
          userId: "6658b6d239cd29c177844e5f",
        }
      });
      return res.data;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

// Remove Product in cart Data

export const deleteCartProduct = createAsyncThunk(
  "cartData/deleteCartProduct",
  async (productId) => {
    try {
      const res = await axios.delete(
        `${Base_url}/api/v1/addToCart/deleteProduct`,
        {
          params: {
            productId,
          }
        }
      );
      console.log("NNFHFHF", res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
