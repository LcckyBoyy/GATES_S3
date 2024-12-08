import React from "react";
import { useState, useEffect } from "react";

const Loading = ({
  count = 4,
  size = "w-3 h-3",
  baseColor = "bg-gray-300",
  activeColor = "bg-gray-600",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, 300);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex space-x-3">
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className={`
                ${size} 
                rounded-full 
                ${index === activeIndex ? activeColor : baseColor}
                transform 
                transition-all 
                duration-300 
                ease-in-out 
                ${index === activeIndex ? "scale-125" : "scale-100"}
              `}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
