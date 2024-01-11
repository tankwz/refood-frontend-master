/** @format */

import { useState } from "react";

export default function useGetCount() {
  const [getCount, setGetCount] = useState(1);
  const handleSetGetCount = (quantity) => {
    setGetCount(quantity);
  };

  return {
    getCount,
    setGetCount,
    handleSetGetCount,
  };
}
