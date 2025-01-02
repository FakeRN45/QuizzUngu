import React from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Leaderboard from "../pages/Leaderboard";
import PlayButton from "../PlayButton/PlayButton";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="main-page">
        <Leaderboard />
        <PlayButton />
        <Dashboard />
      </div>
    </>
  );
};

export default Home;