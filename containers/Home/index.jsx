import React from "react";
import SliderComponent from "@/components/SliderComponent";
import HomeCategories from "@/components/HomeCategories";


const HomeContainer = () => {
  return (
    <div className=" flex flex-col items-center  ">
      <div className="bg-white">
        <SliderComponent />
      </div>
      <div className="bg-white">
        <HomeCategories />
      </div>
    </div>
  );
};

export default HomeContainer;
