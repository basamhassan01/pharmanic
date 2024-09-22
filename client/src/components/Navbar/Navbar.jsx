import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className="h-[10vh] flex">
      <div className="h-full flex flex-1 justify-between items-center bg-white border-b border[#0B81C7] border-opacity-10">
        <img
          src="/images/logos/Pharmanic_Logo.png"
          alt=""
          className="ml-4 h-[6vh] w-auto"
        />
        <div className="flex flex-col gap-1 cursor-pointer mr-4 group">
          <FontAwesomeIcon icon={faBars} className="text-[26px] text-[#0B81C7] hover:text-[#0dccd6] hover-cursor" />
        </div>
      </div>
      <div className="pl-4 pr-4 h-full flex flex-grow basis-3/5 justify-between items-center border-l border-b border[#0B81C7] border-opacity-10">
        <div className="text-[28px] font-bold">
          Pharmanic Management System
        </div>
        <FontAwesomeIcon icon={faCircleQuestion} className="text-[26px] text-[#0B81C7] hover:text-[#0dccd6] hover-cursor" />
      </div>
    </div>
  );
}

export default Navbar;
