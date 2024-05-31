"use client";
import Footer from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import ViewAllProducts from "@/components/products/view-all-products";
import ComponentWrapper from "@/components/wrapper/componentWrapper";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
export  const isAuthenticate = window.localStorage.getItem("refreshToken")
const page = () => {
  const pathName = usePathname()
  const router = useRouter()
  console.log(pathName)

 console.log("isAuthenticate",isAuthenticate)

 useEffect(() =>{
if(!isAuthenticate){
  // router.push('/mandi/auth/login')
}
 },[])
  return (
   <>
   {/* {!isAuthenticate &&  <Header/> } */}
  
    <ComponentWrapper>
    <div className=" w-full">
      <ViewAllProducts />
    </div>
    </ComponentWrapper>
    {/* {!isAuthenticate &&  <Footer/> } */}
    
   </>
  );
};

export default page;
