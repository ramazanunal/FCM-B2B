import React from 'react';
import Header from '../Header';
import SliderComponent from '../SliderComponent';

function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center bg-[url('https://caliskanari.com/wp-content/uploads/2018/10/clothes-2049536750.jpg.webp')] ">
      <div>
        <Header />
      </div>
      <div>
        <SliderComponent/>
      </div>
    </div>
  );
}

export default Homepage;
