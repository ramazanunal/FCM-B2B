"use client";
import { useState } from "react";

// kullanılacak amaç için modifiye edilmelidir
// items prop olarak ta verilebilir/gelebilir?
export default function ProductToggleButton() {
  const [items, setItems] = useState(["Ürün açıklaması", "Ürün özellikleri"]);
  const [currentValue, setCurrentValue] = useState(0);

  return (
    <div className="w-full max-w-96 md:w-3/4 lg:w-[60%] mt-10">
      <div
        className={`relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-[2px] after:block after:transition-transform after:ease-in-out after:bg-gradient-to-r after:from-sky-600 after:to-cyan-700 ${
          currentValue === 0 ? "after:translate-x-0" : "after:translate-x-full"
        }`}
      >
        <div className="flex">
          {items.map((e, i) => (
            <button
              className="w-full"
              key={i}
              onClick={() => setCurrentValue(i)}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="transition-all mt-3 p-2">{currentValue}</div>
    </div>
  );
}
