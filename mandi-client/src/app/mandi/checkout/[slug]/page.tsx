import ShippingAddressForm from "@/components/section/shippingAddress/shippingAddress";
import ComponentWrapper from "@/components/wrapper/componentWrapper";
import React, { Component } from "react";
const Page = () => {
  // console.log('',countries)
  return (
    <ComponentWrapper>
      <section className="mx-auto flex min-h-dvh max-w-7xl flex-col p-8">
        <h1 className="mt-8 text-3xl font-bold text-neutral-900">Checkout</h1>
        <ShippingAddressForm/>
      </section>
    </ComponentWrapper>
  );
};

export default Page;
