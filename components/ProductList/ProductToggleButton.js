"use client";
import { useState } from "react";

export default function ProductToggleButton() {
  const [items, setItems] = useState(["first", "second", "third"]);
  const [currentValue, setCurrentValue] = useState(0);
  return (
    <div className="w-1/3 mt-10">
      <div
        className={`  after:content-[''] after:w-1/${
          items.length
        } after:h-[2px] after:block after:transition-all after:ease-in-out   after:bg-cyan-300   ${
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

      <div className="transition-all mt-2">
        {currentValue }
      </div>
    </div>
  );
}
