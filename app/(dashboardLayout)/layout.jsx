import NavbarHeader from "@/components/NavbarHeader";


const DashboardLayout = ({ children }) => {
  return <>
  <header >
   <NavbarHeader/>
  </header>
  
  {children}</>;
};

export default DashboardLayout;
