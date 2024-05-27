"use client"
import React, { useState } from "react";
import SliderComponent from "@/components/SliderComponent";
import HomeCategories from "@/components/HomeCategories";
import WelcomeSection from "@/components/WelcomeSection";

const HomeContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white">
        <SliderComponent />
      </div>
      <div className="bg-white">
        {isLoggedIn ? (
          <HomeCategories />
        ) : (
          <WelcomeSection/>
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
