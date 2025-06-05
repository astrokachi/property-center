import React from 'react'

export const ContactForm = () => {
  return (
    <form action="" className='flex flex-col w-full'>
      <div className="my-6 flex justify-between">
        <div className="w-1/2 mr-2">
          <label
            htmlFor="firstName"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`w-full px-6 py-2 border trans outline-none rounded-full  border-grey`}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label
            htmlFor="lastName"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`w-full px-6 py-2 border trans outline-none rounded-full  border-grey`}
          />
        </div>
      </div>

      <div className="my-6 flex">
        <div className="w-1/2 mr-2">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full px-6 py-2 border trans outline-none rounded-full  border-grey`}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label
            htmlFor="phoneNumber"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className={`w-full px-6 py-2 border trans outline-none rounded-full  border-grey`}
          />
        </div>
      </div>

      <div className="my-6">
        <div className=" mr-2">
          <label
            htmlFor="message"
            className="block mb-1 text-sm font-medium text-gray-600"
          >
            Message
          </label>
          <input
            type="text"
            id="message"
            name="message"
            className={`w-full px-6 py-2 border trans outline-none rounded-full  border-grey`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-[40%] mx-auto btn-trans scale-up mb-8 mt-12 py-2 px-4 bg-primary text-white rounded-full"
      >
        Submit
      </button>
    </form>
  );
}
