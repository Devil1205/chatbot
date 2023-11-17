import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import socketIO from 'socket.io-client';

function Home({ setShowNavbar, base_URL, verifyUser }) {

    const [messages, setMessages] = useState([]);
    const authToken = localStorage.getItem('auth-token');

    const [socket, setSocket] = useState(null);

    const socketEvents = async (connect) => {

        connect.on('received', async (messages) => {
            await getMessages();
        })
    }

    const navigate = useNavigate();

    const scrollToBottom = () => {
        setTimeout(() => {
            const message = document.getElementsByClassName('messages')[0].childNodes[messages.length-1];
            // console.log(message);
            message.scrollIntoView();
        }, 0);
    };


    useEffect(() => {

        setShowNavbar(false);
        const connect = socketIO.connect(base_URL + "/chatbot", { transports: ['websocket'] });
        setSocket(connect);

        if (!authToken)
            navigate('/user');
        else
        {
            socketEvents(connect);
            getMessages();
        }

        return () => {
            setShowNavbar(true);
        }
    }, [])



    const sendMessage = async (e) => {
        e.preventDefault();
        const message = document.getElementById('sendMessage');
        try {
            const response = await fetch(base_URL + '/chatbotMessageAPI/send',
                {
                    method: "POST",
                    body: JSON.stringify({ content: message.value, type: "sent" }),
                    headers: { "content-type": "application/json", "auth-token": authToken }
                })
            const responseJson = await response.json();
            // console.log(responseJson);

            socket.emit("sent", message.value);
            // console.log(responseJson);
        }
        catch (error) {
            console.log(error);
        }
        e.target[0].value = "";
    }
    // console.log(name);

    const getMessages = async () => {
        try {
            const response = await fetch(base_URL + '/chatbotMessageAPI/chat',
                {
                    method: "GET",
                    headers: { "content-type": "application/json", "auth-token": authToken }
                })
            const responseJson = await response.json();
            // console.log(responseJson);
            setMessages(responseJson);

            // console.log(responseJson);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='home'>
            <div className="backButton" onClick={() => { navigate(-1) }}><ArrowBackIcon fontSize='large' sx={{ color: "white" }} /></div>
            <div className="logo">
                Welcome To Chat-Bot
            </div>
            <div className="container">
                <div className="messages">
                    {
                        messages.map((elem, ind) => {
                            if (ind === messages.length - 1) { scrollToBottom() }
                            return (
                                <div className={elem.mType} key={ind}> {elem.content}</div>
                            )
                        })
                    }
                </div>
                <form className="send" onSubmit={sendMessage}>
                    <input id="sendMessage" type="text" placeholder='chat' />
                    <button className="btn btn-primary submit" type="submit" ><SendIcon fontSize='medium' /></button>
                </form>
            </div>
        </div>
    )
}

export default Home