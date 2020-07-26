import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import appIcon from '../../icons/chat-app.ico';

import './TextContainer.css';

const TextContainer = ({ users, room }) => (
  <div className="textContainer">
    <div>
      <h1><u>Let's Chat</u> <img alt='App Icon' src={appIcon} style={{width: '40px', marginLeft: '15px'}}/></h1>
      <h3>Realtime Chat Application </h3>
      <h3>Created with React, Express, Node and Socket.io </h3>
    </div>
    {
      users
        ? (
          <div>
            <h2>People currently in <i>{ room }</i>:</h2>
            <div className="activeContainer">
              <h3>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    <img alt="Online Icon" src={onlineIcon}/>
                    {name}
                  </div>
                ))}
              </h3>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;