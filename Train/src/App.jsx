import { useEffect } from "react";

import axios from "axios";

import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AllTrains from "./Pages/AllTrains";
import TrainDetails from "./Pages/TrainDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<AllTrains />} />
      <Route path=":trainNumber" element={<TrainDetails />} />
    </Route>
  )
);

const timestampToMinutes = (timestamp) => {
  const milliseconds = timestamp * 1000;
  const now = Date.now();
  const difference = now - milliseconds;
  const minutes = difference / (1000 * 60);
  return minutes;
};

const getToken = async () => {
  const body = {
    companyName: "Mohit Central",
    clientID: "ef244808-e51b-4a47-b72d-9db150e13daa",
    clientSecret: "iIzWcEZsdyUJTDAO",
    ownerName: "Mohit Sharma",
    ownerEmail: "ram@abc.edu",
    rollNo: "33",
  };

  const { data } = await axios.post("http://20.244.56.144/train/auth", body);

  const expirationTime = Date.now() + data.expires_in * 1000;

  localStorage.setItem("token", data.access_token);
  localStorage.setItem("expiry", expirationTime);
};

const checkAndFetchTokenIfNeeded = () => {
  const token = localStorage.getItem("token");
  const expiry = localStorage.getItem("expiry");
  const minutesSinceExpiry = expiry ? timestampToMinutes(expiry) : null;

  if (!token || minutesSinceExpiry === null || minutesSinceExpiry <= 5) {
    getToken();
  }
};

function App() {
  useEffect(() => {
    checkAndFetchTokenIfNeeded();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
