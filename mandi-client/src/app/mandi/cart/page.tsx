"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { isAuthenticate } from "../page";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  fetchAddToCartProduct,
  fetchCartQuantity,
  getAllAddProductLength,
} from "@/lib/thunk";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

export const Base_url = " http://localhost:8080";
const Cart = () => {
  const dispatch = useDispatch();
  const [checkedID, setCheckedID] = useState([]);
  const cartAddData = useSelector((state) => state?.cartData?.addCartData);

  let totalQuantity = 0;
  let productPrice = 0;

  cartAddData?.forEach((product) => {
    totalQuantity += product.quantity;
    productPrice += product.products.price * product.quantity;
  });
  const handleRemove = async (productId) => {
    try {
      await dispatch(deleteCartProduct(productId));
      setCheckedID([...checkedID, productId]);
      // Call fetchAddToCartProduct after removing the product
      await dispatch(fetchAddToCartProduct("6616e39fa9a2d6cf0ac198f0"));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleQuantity = async ({ productId, action }) => {
    try {
      await dispatch(fetchCartQuantity({ productId, action }));
      await dispatch(fetchAddToCartProduct(isAuthenticate));
      setCheckedID([...checkedID, productId]);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    dispatch(fetchAddToCartProduct(isAuthenticate));
  }, [dispatch, checkedID]);
  useEffect(() => {
    dispatch(getAllAddProductLength(isAuthenticate));
  }, [dispatch, checkedID]);
  console.log("cartAddData", cartAddData);
  return (
    <div className="w-full mt-[4rem]">
      <section className="mx-auto max-w-7xl p-8">
        <h1 className="mt-8 text-3xl font-bold text-gray-900">
          Your Shopping Cart
        </h1>
        <form className="mt-12">
          <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
            {cartAddData?.map((cart) => {
              return (
                <li className="flex py-4">
                  <div className="aspect-square h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-gray-50 sm:h-32 sm:w-32">
                    <img
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain object-center"
                      src="https://storefront.saleor.io/_next/image?url=https%3A%2F%2Fstorefront1.saleor.cloud%2Fmedia%2Fthumbnails%2Fproducts%2Fsaleor-grey-hoodie_thumbnail_1024.webp&w=640&q=75"
                    />
                  </div>
                  <div className=" flex flex-1 flex-col justify-between p-4 py-2">
                    <div className="flex justify-between justify-items-start gap-4">
                      <div>
                        <h2 className="font-medium text-gray-700">
                          {cart?.products?.title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          {cart?.products?.category}
                        </p>
                      </div>
                      <p className="text-right font-semibold text-gray-900">
                        $ {cart?.products?.price}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-sm font-bold flex gap-2 justify-center items-center">
                        {cart?.quantity > 1 && (
                          <CiCircleMinus
                            onClick={() =>
                              handleQuantity({
                                productId: cart?._id,
                                action: "decrease",
                              })
                            }
                            className="w-6 h-6 cursor-pointer"
                          />
                        )}
                        <b className="text-[1.3rem]">{cart?.quantity}</b>{" "}
                        <CiCirclePlus
                          onClick={() =>
                            handleQuantity({
                              productId: cart?._id,
                              action: "increase",
                            })
                          }
                          className="w-6 h-6 cursor-pointer"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemove(cart?._id)}
                        className="text-sm text-gray-500 hover:text-red-500"
                        aria-disabled="false"
                      >
                        Remove
                        <span className="sr-only">line from cart</span>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* <!-- Add more list items here --> */}
          </ul>
          <div className="mt-12">
            <div className="rounded border bg-gray-50 px-4 py-2">
              <div className="flex items-center justify-between gap-2 py-2">
                <div>
                  <p className="font-semibold text-gray-900">Your Total</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Shipping will be calculated in the next step
                  </p>
                </div>
                 <div className="font-medium text-gray-900">Total : {totalQuantity}</div>
                <div className="font-medium text-gray-900">${productPrice}</div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Link
                href={`/mandi/checkout/${isAuthenticate?.slice(0,10)}`}
                className="inline-block max-w-full rounded border border-transparent bg-gray-900 px-6 py-3 text-center font-medium text-gray-50 hover:bg-gray-800"
              >
                Checkout
              </Link>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Cart;
