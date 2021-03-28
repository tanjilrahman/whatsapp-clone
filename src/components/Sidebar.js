import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import React, { useEffect, useState } from 'react';
import '../styles/Sidebar.css';
import SidebarChat from './SidebarChat';
import db from '../firebase/firebase';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

function Sidebar({ user, startLogout }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const unsubscrib = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))

        return () => {
            unsubscrib();
        }
    }, [])

    return (
        <div className="sidebar">

            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton onClick={startLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <input placeholder="Search or start new chat" type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => ({
    startLogout: dispatch(startLogout)
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
