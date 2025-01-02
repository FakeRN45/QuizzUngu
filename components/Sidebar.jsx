import React from 'react';
import '../style/Sidebar.css';

const Sidebar = ({ friends }) => {
  return (
    <div className="sidebar">
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li
            key={friend.id}
            className={friend.online ? 'friend online' : 'friend offline'}
          >
            <img
              src={friend.profilePicture}
              alt={friend.name}
              className="friend-avatar"
            />
            {friend.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;