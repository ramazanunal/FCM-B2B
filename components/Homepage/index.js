import React from "react";
import Header from "../Header";
import SliderComponent from "../SliderComponent";
import Footer from "../Footer";
import Banner from "../Banner";
import HomeCategories from "../HomeCategories";

function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center bg-[url('https://caliskanari.com/wp-content/uploads/2018/10/clothes-2049536750.jpg.webp')]">
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
      <Banner/>
    </div>
  );
}

export default Homepage;
