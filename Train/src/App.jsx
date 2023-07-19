import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TrainDetails from "./Pages/TrainDetails.jsx";
import AllTrains from "./Pages/AllTrains.jsx";
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllTrains />,
  },
  {
    path: "/:trainNumber",
    element: <TrainDetails />,
  },
]);

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getToken = async () => {
      const body = {
        companyName: "Mohit Central",
        clientID: "ef244808-e51b-4a47-b72d-9db150e13daa",
        clientSecret: "iIzWcEZsdyUJTDAO",
        ownerName: "Mohit Sharma",
        ownerEmail: "ram@abc.edu",
        rollNo: "33",
      };

      const { data } = await axios.post(
        "http://20.244.56.144/train/auth",
        body
      );
      localStorage.setItem("token", data.access_token);
    };

    if (!token) {
      getToken();
    }
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
