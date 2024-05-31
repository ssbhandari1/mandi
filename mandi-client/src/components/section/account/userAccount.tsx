import Image from "next/image";
import React from "react";

const UserAccount = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <div className="bg-green-400 rounded-md shadow-md p-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-2">
                    <Image
                      src={""}
                      alt=""
                      //   src={photoPrev || `${Base_url}/${user?.photo}`}
                      //   alt={user.username}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  </div>
                  <h5 className="text-xl font-bold">santohs</h5>
                  <p className="text-sm text-gray-600">delhi</p>
                  <p className="text-sm text-gray-600">pitampiru</p>
                </div>
              </div>
              <hr className="border-t" />
              <div className="p-4">
                <div className="flex justify-center">
                  <input
                    type="file"
                    id="imgupload"
                    className="hidden"
                    // onChange={handleFileInputChange}
                  />
                  <label
                    htmlFor="imgupload"
                    className="text-green-600 font-semibold text-center w-full cursor-pointer"
                    style={{ padding: ".31rem" }}
                  >
                    Change Picture
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-2">
          <div className="bg-green-400 rounded-md shadow-md p-6">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-bold leading-6 text-neutral-900">
                    Profile
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-neutral-500">
                    The information can be edited
                  </p>
                </div>
                <div className="border-t border-neutral-200 px-4 py-5 sm:p-0">
                  <dl className="">
                    <div className="py-3 flex flex-wrap items-center">
                      <div className="w-full sm:w-1/2 px-3">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-solid border-neutral-300 rounded-md"
                          placeholder="John Doe"
                          readOnly
                        />
                      </div>
                      <div className="w-full sm:w-1/2 px-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Email Address
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-solid border-neutral-300 rounded-md"
                          placeholder="john.doe@example.com"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="py-3 flex flex-wrap items-center">
                      <div className="w-full sm:w-1/2 px-3">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-solid border-neutral-300 rounded-md"
                          placeholder="John Doe"
                          readOnly
                        />
                      </div>
                      <div className="w-full sm:w-1/2 px-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-neutral-700"
                        >
                          Email Address
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-solid border-neutral-300 rounded-md"
                          placeholder="john.doe@example.com"
                          readOnly
                        />
                      </div>
                    </div>
                  </dl>
                </div>
                <div className="bg-neutral-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-neutral-50 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
