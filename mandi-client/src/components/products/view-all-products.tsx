import React, { useEffect, useState } from "react";
import Cart from "../section/productCart/cart";
import { useRouter } from "next/navigation";
import { FaAnglesDown } from "react-icons/fa6";
import { fetchAllProductData } from "@/lib/thunk";
import { useDispatch, useSelector } from "react-redux";

const ViewAllProducts = () => {
  const dispatch = useDispatch()
  const router = useRouter();
  const allProductdata = useSelector((state) => state.allProduct.data)
  const handleNavigate = (it: any) => {
    router.push(`/mandi/product/${it}`);
  };
console.log('allProductdata',allProductdata)

  useEffect(() => {
    dispatch(fetchAllProductData())
  }, []);
  return (
    <div className="w-full flex items-center flex-wrap gap-[3rem] flex-col p-5">
      <div className="w-full flex items-center justify-center flex-wrap gap-6 ">
        {allProductdata?.map((product, index) => {
          return (
            <div
              key={index}
              className="w-[300px] h-[300px] bg-blue-50 rounded-md mb-7"
              onClick={() => handleNavigate(product._id)}
            >
              <Cart product={product}/>
            </div>
          );
        })}
      </div>
      <div>
      <div className="relative animate-bounce">
      <FaAnglesDown className="w-10 h-10 cursor-pointer text-stone-500"/>
    </div>
       
      </div>
    </div>
  );
};

export default ViewAllProducts;
