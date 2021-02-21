import { useState, useEffect } from "react";

const useArrowKeys = (initialPosition = 0, limit = 20) => {
  const [position, setPosition] = useState(initialPosition);

  const downHandler = ({ key }) => {
    if (key === "ArrowRight") {
      setPosition(position >= limit ? limit : position + 1);
    }
    if (key === "ArrowLeft") {
      setPosition(position <= 0 ? 0 : position - 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [position]);

  return { position, setPosition };
};
export default useArrowKeys;
