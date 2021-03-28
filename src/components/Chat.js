import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase'
import "../styles/Chat.css"
import db from '../firebase/firebase';
import { connect } from 'react-redux';

function Chat({ user }) {
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot(snapshot => (setRoomName(snapshot.data().name)))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    messages: doc.data()
                })))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault()

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {" "}{new Date(messages[messages.length - 1]?.messages.timestamp?.toDate()).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric'})} at {new Date(messages[messages.length - 1]?.messages.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => (
                    <p  key={message.id}
                        className={`chat__message ${message.messages.name === user.displayName && "chat__reciever"}`}
                    >
                        <span className="chat__name">{message.messages.name}</span>
                        {message.messages.message}
                        <span className="chat__timestamp">
                            {new Date(message.messages.timestamp?.toDate()).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric'})} at {new Date(message.messages.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(Chat)
