import React from "react";

const Navbar = () => {
  return (
    <div className="bg-[#003153] text-white px-5 md:px-12 py-4 flex justify-between md:justify-around  w-full">
      <div>
        <h2 className="font-bold text-xl cursor-pointer">TaskPoint</h2>
      </div>
      <div className="flex gap-3 md:gap-4 items-center ">
        <p className="cursor-pointer hover:font-bold">Home</p>
        <p className="cursor-pointer hover:font-bold "> Your Task </p>
      </div>
    </div>
  );
};

export default Navbar;
