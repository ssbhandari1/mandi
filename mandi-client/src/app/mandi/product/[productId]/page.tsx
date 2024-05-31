"use client";
import ComponentWrapper from "@/components/wrapper/componentWrapper";
import {
  addToCartProduct,
  getAllAddProductLength,
  getSingleProduct,
} from "@/lib/thunk";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { isAuthenticate } from "../../page";
import { useDispatch, useSelector } from "react-redux";

const page = (props: any) => {
  const [cartdata, setCartData] = useState<any>({});
  const params = useParams<{ productId: string }>();
  const [checkedID, setCheckedID] = useState<string[]>([]);
  const dispatch = useDispatch();
  const singleProduct = useSelector(
    (state) => state?.allProduct?.singleProduct
  );
  const addToCartLength = useSelector(
    (state) => state?.cartData?.addToCartLength
  );
  const router = useRouter();

  const handleAddToCart = async (productId: string) => {
    try {
    const res = await dispatch(addToCartProduct(productId));
      setCheckedID([...checkedID, productId]);
      console.log("addToCartProduct",res)
      router.push("/mandi/cart");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getSingleProduct(params?.productId));
  }, [params]);

  useEffect(() => {
    dispatch(getAllAddProductLength(isAuthenticate));
  }, [checkedID]);
  return (
    <ComponentWrapper>
      <div
        className="w-full flex gap-5 flex-col sm:justify-center sm:flex-row p-5"
        id="viewProduct"
      >
        <div className="sm:w-1/3 h-[400px] bg-slate-100  grid place-items-center">
          <img
            src="https://storefront.saleor.io/_next/image?url=https%3A%2F%2Fstorefront1.saleor.cloud%2Fmedia%2Fthumbnails%2Fproducts%2Fsaleor-grey-hoodie_thumbnail_1024.webp&w=640&q=75"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="sm:w-1/2 h-auto bg-slate-100 rounded-md shadow-md ">
          <div className="w-full flex flex-col p-4 gap-4">
            <h1 className="mb-2 text-xl font-bold">{singleProduct?.title}</h1>
            <p className="mb-2 text-gray-600">
              Description: {singleProduct?.category}
            </p>
            <div className="flex gap-4">
              <p className="mb-2 text-red-600">
                <del>$50</del>
              </p>
              <p className="mb-2">${singleProduct?.price}</p>
            </div>{" "}
            <p className="mb-2 text-green-700">In stock</p>
            {/* Extra fields can be added here */}
            {addToCartLength?.productIds?.includes(singleProduct._id) ? (
              <button className="bg-blue-200 text-white py-2 px-4 rounded-md ">
                Added
              </button>
            ) : (
              <button
                onClick={() => handleAddToCart(singleProduct._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            )}
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300">
              Proceed to Buy
            </button>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default page;
