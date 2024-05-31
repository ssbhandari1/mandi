import React, { useState } from "react";
import countries from "./data.json";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddressForm = () => {
  const [postApiData, setPostData] = useState<any>([])
  const formik = useFormik({
    initialValues: {
      user: "",
      phone: "",
      alterNativePhone: "",
      country: "India",
      address: "",
      pinCode: "",
      state: "",
      city: "",
      submit: null,
    },
    validationSchema: Yup.object({
      user: Yup.string().required("User is required"),
      phone: Yup.string().required("Phone number is required"),
      alterNativePhone: Yup.string(),
      country: Yup.string().required("Country is required"),
      address: Yup.string().required("Address is required"),
      pinCode: Yup.string().required("Pin code is required"),
      state: Yup.string().required("State is required"),
      city: Yup.string().required("City is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        // Your form submission logic here
      } catch (error) {
        // Handle form submission errors
      }
    },
  });
  console.log("formik", formik.values);
  const handlePinCodeBlur = async () => {
    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${formik.values.pinCode}`
      );
   console.log("handlePinCodeBlur",response)
      setPostData(response?.data[0]?.PostOffice)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log("response", postApiData);
  // GET https://api.postalpincode.in/pincode/{PINCODE}
  return (
    <div className="py-1" data-testid="shippingAddressSection">
      <form action="post">
        <p className=" font-bold mb-4">Shipping address</p>
        <div className="mt-2 grid grid-cols-1 gap-3">
          <div className="space-y-0.5">
            <label className="flex flex-col">
              <span className="text-xm text-neutral-700">First name</span>
              <input
                required
                className="mt-0.5 w-full p-2 border border-solid  appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
                type="tel"
                name="user"
                value={formik.values.user}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </label>
          </div>

          <div className="space-y-0.5">
            <label className="flex flex-col">
              <span className="text-xm text-neutral-700">Pin code</span>
              <input
                required
                className="mt-0.5 w-full p-2 border border-solid  appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
                type="tel"
                value={formik.values.pinCode}
                onChange={formik.handleChange}
                onBlur={() => {
                  formik.handleBlur("pinCode");
                  handlePinCodeBlur(); // Call the handlePinCodeBlur function on blur
                }}
                name="pinCode"
              />
            </label>
          </div>
          <div className="space-y-0.5">
            <label className="flex flex-col">
              <span className="text-xm text-neutral-700">Country</span>
              <input
                required
                className="mt-0.5 w-full p-2 border border-solid  appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
                type="tel"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="Country"
              />
            </label>
          </div>
          <div className="space-y-0.5">
            <label className="flex flex-col">
              <span className="text-xm text-neutral-700">State</span>
              <input
                required
                className="mt-0.5 w-full p-2 border border-solid  appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
                type="tel"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="state"
              />
            </label>
          </div>
          <div className="space-y-0.5">
            <label className="flex flex-col">
              <span className="text-xm text-neutral-700"></span>City
              <input
                required
                className="mt-0.5 w-full p-2 border border-solid  appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
                type="tel"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="city"
              />
            </label>
          </div>
          <div className="space-y-0.5">
            <label className="flex flex-col">
              <span className="text-xm text-neutral-700">Street address</span>
              <input
                required
                className="mt-0.5 w-full p-2 border border-solid  appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
                type="tel"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="address"
              />
            </label>
          </div>

          <div className="space-y-0.5">
            <label className="flex flex-col">
              <span className="text-xm text-neutral-700">Phone number</span>
              <input
                className="mt-0.5 w-full p-2 border border-solid  appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
                type="tel"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phone"
              />
            </label>
          </div>

          <div className="py-4" data-testid="paymentMethods">
            <p className="mb-2 font-bold">Payment methods</p>
            <div className="gap-y-8">
              <form className="my-8 flex flex-col gap-y-6">
                {/* <div className="payment-element StripeElement">
                <div
                  className="__PrivateStripeElement"
                  style={{
                    margin: "-4px 0px !important",
                    padding: "0px !important",
                    border: "none !important",
                    display: "block !important",
                    background: "transparent !important",
                    position: "relative !important",
                    opacity: "1 !important",
                    clear: "both !important",
                    transition: "height 0.35s ease 0s !important",
                  }}
                >
                  <iframe
                    name="__privateStripeFrame6294"
                    frameBorder="0"
                    scrolling="no"
                    role="presentation"
                    allow="payment *; publickey-credentials-get *"
                    src="https://js.stripe.com/v3/elements-inner-payment-7e0525d1a4d0c6c61ace6a9d3b4cbd78.html#wait=false&amp;rtl=false&amp;publicOptions[fields][billingDetails]=never&amp;publicOptions[layout]=tabs&amp;componentName=payment&amp;keyMode=test&amp;apiKey=pk_test_51LVZwxEosEcNBN5mTKD5afBfOzEF1S1T9tMGyfG4sw6vC6adm8VaKph9EGee1Dk1rlSWz9LgOj4nNNLb2CxJS3HT00x3Dx44oB&amp;referrer=https%3A%2F%2Fstorefront.saleor.io%2Fcheckout%3Fcheckout%3DQ2hlY2tvdXQ6NTgzYzAxMjYtMGZjYS00NGQ4LWE0ZjktNWVjYzM1YjMxMTk3&amp;controllerId=__privateStripeController6291"
                    title="Secure payment input frame"
                    style={{
                      border: "0px !important",
                      margin: "-4px",
                      padding: "0px !important",
                      width: "calc(100% + 8px)",
                      minWidth: "100% !important",
                      overflow: "hidden !important",
                      display: "block !important",
                      userSelect: "none !important",
                      transform: "translate(0px) !important",
                      colorScheme: "light only !important",
                      height: "156.375px",
                      opacity: "1",
                      transition:
                        "height 0.35s ease 0s, opacity 0.4s ease 0.1s",
                    }}
                  ></iframe>
                </div>
              </div> */}
                <button
                  className="h-12 items-center rounded-md bg-neutral-900 px-6 py-3 text-base font-medium leading-6 text-white shadow hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70 hover:disabled:bg-neutral-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-70 hover:aria-disabled:bg-neutral-700"
                  aria-disabled="false"
                  id="submit"
                >
                  <span className="button-text">Pay now</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
