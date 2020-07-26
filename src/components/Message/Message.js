import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name}) => {
    let isSentByCurrentUser = 0;  // 0: False, 1: True, -1: Admin

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName){
        isSentByCurrentUser = 1;
    }

    if(user === 'admin'){
        isSentByCurrentUser = -1;
    }

    return (
        (isSentByCurrentUser === 1)
        ? (
            <div className="messageContainer">
                <p className='sentText pr-10'>{trimmedName}</p>
                <div className='messageBox backgroundDark'>
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : ((isSentByCurrentUser === 0) 
        ? (
            <div className="messageContainer justifyStart">
                <div className='messageBox backgroundLight'>
                    <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
                </div>
                <p className='sentText pl-10'>{user}</p>
            </div>
        ) : (
            <div className="messageContainer justifyCenter">
                <div className="messageBox backgroundAdmin">
                    <p className="messageText colorAdmin">{text}</p>
                </div>
            </div>
        ))
    )
}

export default Message;