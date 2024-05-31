"use client";
import ComponentWrapper from "@/components/wrapper/componentWrapper";
import AddressForm from "./addressForm";

import SummaryOrder from "./summaryOrder";
export default function ShippingAddressForm() {
  return (
      <div className="grid min-h-screen grid-cols-1 gap-x-16 lg:grid-cols-2">
        <AddressForm />
        <SummaryOrder />
      </div>
  );
}
