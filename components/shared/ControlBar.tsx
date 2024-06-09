"use client";
import { useState } from "react";

const ControlBar = () => {
  const [number, setNumber] = useState(5);

  return (
    <div className="flex justify-center">
      <div className="flex-between fixed z-50 m-8 w-2/4 gap-5 rounded-2xl bg-[#EEEEEE]  p-4 shadow-light-300 sm:px-12  ">
        <div className="flex gap-5"></div>
        <div></div>
      </div>
    </div>
  );
};

export default ControlBar;
