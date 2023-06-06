"use client";

import Image from "next/image";
import React, { useState } from "react";
import searchIcon from "../assets/search.png";
import arrowIcon from "../assets/navigation.png";
import checkIcon from "../assets/check.png";

export default function Form() {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { from: fromLocation.trim(), to: toLocation.trim() };
    let response = await fetch("api/locations", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const { msg } = await response.json();
    setFromLocation("");
    setToLocation("");
    setResponseMessage(msg);
    console.log("Form Submitted successfully");
  };

  const isMessageEmpty = responseMessage === ""
  const isRouteAlreadyRequested = responseMessage === "Route already requested" 
  const isNewRouteRequested = responseMessage === "Route requested successfully" 

  return (
    <div className="flex-col justify-between w-[350px]">
      <div className="bg-white rounded-xl p-4 text-left shadow-lg">
        <h1 className="text-black font-bold text-[17px]">
          Request a New Route!
        </h1>
        <p className="text-gray-500 text-[12px] mt-2">
          Help us enhance our services with your valuable feedback on public
          routes
        </p>
      </div>
      {isMessageEmpty &&
        <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl py-5 text-left mt-3 shadow-lg px-6">
          <h1 className="text-black font-bold mb-2 text-[17px]">
            Route Details (From - To)
          </h1>
          <label
            htmlFor="from"
            className="text-[12px] text-gray-600 font-semibold mb-2"
          >
            From
          </label>
          <div className="flex items-center border-slate-200 border-[1px] p-2 rounded-md mb-3">
            <Image
              src={searchIcon}
              alt="search icon"
              className="w-[12px] mr-2"
            />
            <input
              value={fromLocation}
              onChange={(event) => setFromLocation(event.target.value)}
              type="text"
              id="from"
              placeholder="Select From Location"
              className="text-[13px] w-full outline-none text-black"
              autoComplete="off"
              required
            />
            <Image src={arrowIcon} alt="search icon" className="w-[15px]" />
          </div>
          <label
            htmlFor="to"
            className="text-[12px] text-gray-600 font-semibold"
          >
            To
          </label>
          <div className="flex items-center border-slate-200 border-[1px] p-2 rounded-md">
            <Image
              src={searchIcon}
              alt="search icon"
              className="w-[12px] mr-2"
            />
            <input
              value={toLocation}
              onChange={(event) => setToLocation(event.target.value)}
              type="text"
              id="to"
              placeholder="Select To Location"
              className="text-[13px] outline-none w-full text-black"
              autoComplete="off"
              required
            />
            <Image src={arrowIcon} alt="search icon" className="w-[15px]" />
          </div>
        </div>
        <div className="mt-10 text-center">
          <p className="text-gray-500 text-[10px]">
            powered by{" "}
            <span className="font-bold text-black text-[13px]">
              Delhi Government
            </span>
          </p>
          <button
            type="submit"
            className="text-white bg-teal-500 p-3 rounded-lg text-sm w-full mt-2 font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
       }
      
      {isRouteAlreadyRequested && (
        <div className="mt-4 flex flex-col justify-center items-center bg-white rounded-xl p-4 text-left shadow-lg">
          <h1 className="text-black font-bold text-[17px] m-4">
            Route already requested
          </h1>
          <button onClick={() => setResponseMessage("")} className="text-white bg-teal-500 p-3 rounded-lg text-sm w-full font-semibold">
            Request new route
          </button>
        </div>
      )}
      {isNewRouteRequested && (
        <div className="mt-4 flex flex-col justify-center items-center bg-white rounded-xl p-4 text-left shadow-lg">
          <Image
              src={checkIcon}
              alt="check icon"
              className="w-14"
            />
            <p className="text-black text-[15px] m-4 font-semibold">Route requested successfully </p>
          <button onClick={() => setResponseMessage("")} className="text-white bg-teal-500 p-3 rounded-lg text-sm w-full font-semibold">
            Request another route
          </button>
        </div>
      )}
    </div>
  );
}
