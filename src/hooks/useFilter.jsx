import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
export default function useFilter(dataList, callBack) {
  const [category, setCategory] = useLocalStorage("filter", "");
  const filterExpenses = dataList.filter((data) =>
    callBack(data).toLowerCase().includes(category)
  );
  return [filterExpenses, setCategory];
}
