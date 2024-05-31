import React from "react";

const SummaryOrder = () => {
  return (
    // <div className="bg-slate-100  rounded-md">
        <div className="bg-slate-100 p-4 rounded-md">
      <details open className="group">
        <summary className="-mb-2 flex cursor-pointer flex-row items-center pt-4">
          <p className="mb-2 font-bold">Summary</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="mb-2 group-open:rotate-180"
          >
            <path d="M8.5 10L12 14L15.5 10" stroke="currentColor"></path>
          </svg>
        </summary>
        <ul className="py-2" data-testid="SummaryProductList">
          <li
            className="flex border-b py-4 last:border-none"
            data-testid="SummaryItem"
          >
            <div className="aspect-square h-16 w-16 flex-shrink-0 overflow-hidden rounded border bg-neutral-50 md:h-24 md:w-24 md:bg-white">
              <img
                src="https://storefront1.saleor.cloud/media/thumbnails/products/saleor-ascii-shirt-front_thumbnail_64.png"
                alt=""
                className="h-full w-full object-contain object-center"
              ></img>
            </div>
            <div className="flex flex-1 flex-col justify-between pl-4">
              <div className="flex justify-between justify-items-start gap-4">
                <div className="flex flex-col gap-y-1">
                  <p className="font-bold">Saleor Monospace T-Shirt</p>
                  <p className="text-xs text-neutral-500">M</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <form action="post">
                    <div className="space-y-0.5">
                      <label className="flex flex-col">
                        <span className="text-xs text-neutral-700">
                          Quantity<span aria-hidden="true">*</span>
                        </span>
                        <input
                          required
                          spellCheck="false"
                          className="mt-0.5 w-full appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none max-w-[6ch] text-center"
                          value="1"
                          name="quantity"
                        ></input>
                      </label>
                    </div>
                  </form>
                  <div className="flex flex-col items-end justify-end">
                    <div className="flex flex-row flex-wrap justify-end gap-x-2">
                      <p aria-label="total price">$20.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </details>
      <form action="post">
        <div className=" my-4 ">
          <div className="space-y-0.5">
            <label className="flex flex-col">
              <span className="text-xm text-neutral-700">
                Add gift card or discount code
              </span>
              <input
              required
              className="mt-0.5 w-full p-2 border border-solid  appearance-none rounded-md border-neutral-300 shadow-sm transition-colors focus:border-neutral-300 focus:outline-none focus:ring focus:ring-neutral-200 focus:ring-opacity-50 active:border-neutral-200 active:outline-none"
              type="tel"
              value=""
              name="promoCode"
            />
            </label>
          </div>
        </div>
      </form>
      <div className="border-neutral-200 bg-green-400 w-full border-t"></div>
      <div className="mt-4 flex max-w-full  flex-col">
        <div className="mb-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <p color="secondary">Subtotal</p>
          </div>
          <p aria-label="subtotal price">$20.00</p>
        </div>
        <div className="mb-2 flex flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <p color="secondary">Shipping cost</p>
          </div>
          <p aria-label="shipping cost">$0.00</p>
        </div>
        <div className="border-neutral-200 h-px w-full border-t my-4"></div>
        <div className="flex flex-row  items-baseline justify-between pb-4">
          <div className="flex flex-row items-baseline">
            <p className="font-bold">Total price</p>
            <p color="secondary" className="ml-2">
              includes $0.00 tax
            </p>
          </div>
          <p data-testid="totalOrderPrice" aria-label="total price">
            $20.00
          </p>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default SummaryOrder;
