import Header from "@/components/Header";
import NavbarHeader from "@/components/NavbarHeader";
import { MdLogout } from "react-icons/md";



const DashboardLayout = ({ children }) => {
  return <>
  <div className=" bg-DarkBlue grid grid-cols-3 " >
  <div className="col-span-2  ">
  <Header />
  </div>
  <div className="col-span-1  flex justify-end pr-3">
  <div className=" flex items-center space-x-3  ">
    <img src="/assets/images/avatarIcon.svg" alt="avatar" className="w-8" />
    <div className="text-sm text-white flex flex-col">
      <span className="whitespace-nowrap"> Emrah Eskibağcı</span>
      <span className="text-xs">(user)</span>
    </div>
    <div className="text-white hover:text-red-500 text-2xl">
      <MdLogout className="cursor-pointer"/>
    </div>
  </div>
  </div>

  

  </div>
  
  {children}</>;
};

export default DashboardLayout;
