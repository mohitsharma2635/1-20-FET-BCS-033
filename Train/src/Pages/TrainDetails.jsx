import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TrainDetails = () => {
  const [data, setData] = useState(null);
  const { trainNumber } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getTrain = async () => {
      const { data } = await axios.get(
        `http://20.244.56.144/train/trains/${trainNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setData(data);
    };

    if (token) {
      getTrain();
    }
  }, []);

  const formatTime = (time) => {
    return `${time?.Hours.toString().padStart(
      2,
      "0"
    )}:${time?.Minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold mb-2">
        {data?.trainName}
      </h2>
      <p className="text-gray-600">Train Number: {data?.trainNumber}</p>
      <p className="text-gray-600">
        Departure Time: {formatTime(data?.departureTime)}
      </p>
      <p className="text-gray-600">Delayed By: {data?.delayedBy} minutes</p>
      <div className="my-4">
        <p className="text-gray-600">Seats Available:</p>
        <p className="text-gray-600">Sleeper: {data?.seatsAvailable.sleeper}</p>
        <p className="text-gray-600">AC: {data?.seatsAvailable.AC}</p>
      </div>
      <div className="my-4">
        <p className="text-gray-600">Price:</p>
        <p className="text-gray-600">Sleeper: ₹{data?.price?.sleeper}</p>
        <p className="text-gray-600">AC: ₹{data?.price?.AC}</p>
      </div>
    </div>
  );
};

export default TrainDetails;
