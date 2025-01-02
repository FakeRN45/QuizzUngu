import React, { useState, useEffect } from "react";
import "../style/Room.css";

const Dashboard = () => {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/friends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Jika menggunakan JWT
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFriends(data);
        } else {
          setError("Failed to fetch friends list.");
        }
      } catch (err) {
        setError("An error occurred while fetching friends.");
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="dashboard">
      <h3>Friends</h3>
      {error && <p className="error">{error}</p>}
      {friends.length > 0 ? (
        friends.map((friend, index) => (
          <div className={`friend ${friend.status}`} key={index}>
            {friend.name}
            <span>({friend.status})</span>
          </div>
        ))
      ) : (
        <p>No friends found.</p>
      )}
    </div>
  );
};

export default Dashboard;