import { useEffect, useState } from "react";
import TrainCard from "../Components/TrainCard.jsx";
import axios from "axios";

const AllTrains = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getTrains = async () => {
      const { data } = await axios.get("http://20.244.56.144/train/trains", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data);
    };

    if (token) {
      getTrains();
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((train, index) => (
        <TrainCard key={index} train={train} />
      ))}
    </div>
  );
};

export default AllTrains;
