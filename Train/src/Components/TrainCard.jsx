import React from "react";
import { Link } from "react-router-dom";
const TrainCard = ({ train }) => {
  const {
    trainName,
    trainNumber,
    departureTime,
    seatsAvailable,
    price,
    delayedBy,
  } = train;

  const formatTime = (time) => {
    return `${time.Hours.toString().padStart(
      2,
      "0"
    )}:${time.Minutes.toString().padStart(2, "0")}`;
  };

  return (
    <Link
      to={`/${trainNumber}`}
      className="bg-white shadow-lg rounded-lg p-6 mb-4"
    >
      <h2 className="text-xl font-semibold mb-2">{trainName}</h2>
      <p className="text-gray-600">Train Number: {trainNumber}</p>
      <p className="text-gray-600">
        Departure Time: {formatTime(departureTime)}
      </p>
      <p className="text-gray-600">Delayed By: {delayedBy} minutes</p>
      <div className="my-4">
        <p className="text-gray-600">Seats Available:</p>
        <p className="text-gray-600">Sleeper: {seatsAvailable.sleeper}</p>
        <p className="text-gray-600">AC: {seatsAvailable.AC}</p>
      </div>
      <div className="my-4">
        <p className="text-gray-600">Price:</p>
        <p className="text-gray-600">Sleeper: ₹{price.sleeper}</p>
        <p className="text-gray-600">AC: ₹{price.AC}</p>
      </div>
    </Link>
  );
};

export default TrainCard;
