import { useState, useEffect } from "react";
import axios from "axios";
export const useData = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    requestData();
  }, []);
  const requestData = async () => {
    const res = await axios.get(
      `https://gist.githubusercontent.com/vivek2606/81207e5bbdcb0abd8a4105cbb4e90920/raw/weather-data.json`
    );
    setData(res.data);
  };
  return data;
};
