import React from "react";
import Header from "@/components/Header";
import SliderComponent from "@/components/SliderComponent";
import HomeCategories from "@/components/HomeCategories";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

const HomeContainer = () => {
  return (
    <div className="flex flex-col items-center  bg-[url('https://caliskanari.com/wp-content/uploads/2018/10/clothes-2049536750.jpg.webp')] bg-no-repeat bg-[#6bcdec]">
      <div className="bg-white">
        <Header />
      </div>
      <div className="bg-white">
        <SliderComponent />
      </div>
      <div className="bg-white">
        <HomeCategories />
      </div>
      <div className="bg-white">
        <Footer />
      </div>
      <Banner />
    </div>
  );
};

export default HomeContainer;
