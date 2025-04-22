import { useEffect, useState } from 'react';
import { socket } from '../socket';

export const OnlineUser = ()=>{
    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        function onOnlineUser(user) {
            console.log("user", user)
            setOnlineUsers(user)
        }
        socket.on('online_user_list', onOnlineUser);
        return () => {
            socket.off('online_user_list', onOnlineUser);
        };
    }, []);
    return (
        <div>
            <p>Online Users:</p>
            {
                <ul>
                    {
                        onlineUsers.map((user, index) => {
                            return (<li key={index}>{user.name}</li>)
                        })
                    }
                </ul>
            }
        </div>
    );
}