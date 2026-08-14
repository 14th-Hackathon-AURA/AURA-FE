import { useState, useCallback } from "react";

const usePasswordVisibility = (initialVisible = false) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const toggle = useCallback(() => setIsVisible((prev) => !prev), []);

  return [isVisible, toggle];
};

export default usePasswordVisibility;
