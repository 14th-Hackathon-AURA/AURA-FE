import { useState, useCallback } from "react";

const useMultiSelect = (initialValues = []) => {
  const [selected, setSelected] = useState(initialValues);

  const toggle = useCallback((value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  }, []);

  return [selected, toggle, setSelected];
};

export default useMultiSelect;
