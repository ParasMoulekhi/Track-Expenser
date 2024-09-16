import { useEffect, useState } from "react";

export function useLocalStorage(key, initialData) {
  const [data, setData] = useState(initialData);
  useEffect(() => {
    const getExistingData = JSON.parse(localStorage.getItem(key));
    if (getExistingData) {
      setData(getExistingData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);
  const updateLocalStorage = (newData) => {
    // if (typeof newData === "string") {
    //   localStorage.setItem(key, JSON.stringify(eval(newData(data))));
    // }
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(data)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }
    setData(newData);
  };
  return [data, updateLocalStorage];
}
