import { Button } from "@/components/ui/button";
import React from "react";
import { IoLogOut } from "react-icons/io5";

const Navbar = async () => {
  return (
    <div className="flex justify-center">
      <nav className="flex-between fixed z-50 m-8 w-3/4 gap-5 rounded-2xl bg-[#EEEEEE]  p-4 shadow-light-300 sm:px-12  ">
        <div className="flex gap-5">
          Logo
          <div className="flex flex-col font-spaceGrotesk text-black">
            <div>First name</div>
            <div className="text-gray-700">Email address</div>
          </div>
        </div>
        <div>
          <Button>
            <IoLogOut size={32} />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
