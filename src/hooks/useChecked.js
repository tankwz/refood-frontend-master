/** @format */

import { useState } from "react";

export default function useChecked() {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    setIsChecked((isChecked) => !isChecked);
  };

  return {
    isChecked,
    setIsChecked,
    handleChecked,
  };
}
