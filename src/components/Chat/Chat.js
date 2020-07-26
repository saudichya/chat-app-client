import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client'; 

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [JoinError, setJoinError] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //const ENDPOINT = 'localhost:5000';
    const ENDPOINT = 'https://react-dev-chat-app.herokuapp.com/';


    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name); 
        setRoom(room); 

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
                setJoinError(true);
            }
        }); 
        
        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

        return () => {
            socket.off();
        }

    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        (JoinError) ? 
        ( <Redirect to="/" /> ) : 
        (
            <div className='outerContainer'>
                <TextContainer users={users} room={room}/>
                <div className='container'>
                    <InfoBar room={room} />
                    <Messages messages={messages} name={name}/>
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />                
                </div>
            </div>
        )
    )
}

export default Chat;