"use client";
import { isAuthenticate } from "@/app/mandi/page";
import { fetchAddToCartProduct, getAllAddProductLength } from "@/lib/thunk";
import { Avatar, Badge, IconButton } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";

export interface IAppProps {}

export function Header(props: IAppProps) {
  const dispatch = useDispatch();
  const addToCartLength = useSelector(
    (state) => state?.cartData?.addToCartLength
  );
  const [show, setShow] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  console.log("addToCartLength", addToCartLength);
  const handleMenu = () => {
    setShow(!show);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };
  const handleNavigate = () => {
    router.push("/mandi");
  };

  const handleClick = (page: string) => {
    if (page === "Sign out") {
      window.localStorage.removeItem("refreshToken");
      router.push("/mandi/auth/login");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    dispatch(getAllAddProductLength(isAuthenticate));
  }, []);
  useEffect(() => {
    dispatch(fetchAddToCartProduct(isAuthenticate));
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 flex items-center justify-between bg-black bg-opacity-15 backdrop-filter backdrop-blur-sm text-white h-16 px-8 transition-transform duration-500">
      <h1
        className="font-bold text-3xl cursor-pointer"
        onClick={handleNavigate}
      >
        Mandi
      </h1>
      <div className="flex items-center  w-full">
        <form className="w-[40%] mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ...."
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex gap-5 items-center">
          <Badge badgeContent={addToCartLength?.totalLength} color="success">
            <SlBasket
              className="text-black w-8 h-8 cursor-pointer"
              onClick={() => router.push("/mandi/cart")}
            />
          </Badge>

          <div className="flex item-center relative">
            <IconButton onClick={handleMenu}>
              <Avatar
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  cursor: "pointer",
                }}
                src=""
                alt=""
              />
            </IconButton>
            <div
              ref={menuRef}
              className={`z-50  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0 top-[3rem] ${
                !show ? "hidden" : "visible"
              }`}
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  Bonnie Green
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  name@flowbite.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                {["profile", "Settings", "Earnings", "Sign out"].map(
                  (page, index) => {
                    return (
                      <li
                        tabIndex={0}
                        key={index}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                        onClick={() => handleClick(page)}
                        onKeyDown={(e: any) => {
                          if (e.key === "Enter") {
                            handleClick(page);
                          }
                        }}
                      >
                        {page}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
