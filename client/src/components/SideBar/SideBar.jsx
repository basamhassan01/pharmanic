import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faWallet, faFile } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-full bg-[#0B81C7]">
      <Link to="/" className="relative">
        <div className={`w-full h-[6vh] flex gap-4 text-[20px] items-center ${isActive('/') ? 'bg-blue-50' : 'bg-transparent'} hover:bg-blue-300 border-b border-white group`}>
          <FontAwesomeIcon
            icon={faChartPie}
            className={`pl-4 text-[25px] ${isActive('/') ? 'text-default' : 'text-white'} group-hover:text-white`}
          />
          <div className={`text-[22px] ${isActive('/') ? 'text-default' : 'text-white'} group-hover:text-white`}>Dashboard</div>
        </div>
      </Link>
      <Link to="/transaction" className="relative">
        <div className={`w-full h-[6vh] flex gap-4 text-[20px] items-center ${isActive('/transaction') ? 'bg-blue-50' : 'bg-transparent'} hover:bg-blue-300 border-b border-white group`}> 
          <FontAwesomeIcon
            icon={faWallet}
            className={`pl-4 text-[25px] ${isActive('/transaction') ? 'text-default' : 'text-white'} group-hover:text-white`}
          />
          <div className={`text-[22px] ${isActive('/transaction') ? 'text-default' : 'text-white'} group-hover:text-white`}>Transaction</div>
        </div>
      </Link>
      <Link to="/invoice" className="relative">
        <div className={`w-full h-[6vh] flex gap-4 text-[20px] items-center ${isActive('/invoice') ? 'bg-blue-50' : 'bg-transparent'} hover:bg-blue-300 border-b border-white group`}> 
          <FontAwesomeIcon
            icon={faFile}
            className={`pl-4 text-[25px] ${isActive('/invoice') ? 'text-default' : 'text-white'} group-hover:text-white`}
          />
          <div className={`text-[22px] pl-2 ${isActive('/invoice') ? 'text-default' : 'text-white'} group-hover:text-white`}>Invoices</div>
        </div>
      </Link>
    </div>
  );
}

export default SideBar;
