"use client";
import { useState } from "react";

// kullanılacak amaç için modifiye edilmelidir
// items prop olarak ta verilebilir/gelebilir?
export default function ProductToggleButton() {
  const [items, setItems] = useState(["first", "second", "third"]);
  const [currentValue, setCurrentValue] = useState(0);
  return (
    <div className="w-full md:w-2/4 lg:w-[60%] mt-10">
      <div
        className={`  after:content-[''] after:w-1/${
          items.length
        } after:h-[2px] after:block after:transition-all after:ease-in-out   after:bg-gradient-to-r after:from-sky-600 after:to-cyan-700   ${
          currentValue === 0
            ? "after:translate-[0%]"
            : currentValue === 1
            ? "after:translate-x-[100%]"
            : currentValue === 2
            ? "after:translate-x-[200%]"
            : ""
        } `}
      >
        <div className="flex  ">
          {items.map((e, i) => (
            <button
              className="w-full "
              key={i}
              onClick={() => setCurrentValue(i)}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      <div className="transition-all mt-3 p-2">
        {currentValue }
      </div>
    </div>
  );
}
