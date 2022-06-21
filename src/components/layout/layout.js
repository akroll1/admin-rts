import React, { useState, useRef, useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box, Flex } from '@chakra-ui/react'
import { Notification } from '../notifications'
import { useBroadcastStore, useUserStore } from '../../stores'

export const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
    // set broadcasts back to an empty string, here or in broadcast form...
    const broadcast = useBroadcastStore( ({ broadcast }) => broadcast);
    const username = useUserStore( ({ username }) => username);

    const [notificationTimeout, setNotificationTimeout] = useState(false);
    const [broadcasts, setBroadcasts] = useState([]);
    const [broadcastConnection, setBroadcastConnection] = useState(null);
    const connectionRef = useRef(broadcastConnection);
    connectionRef.current = broadcastConnection;
  

    useEffect(() => {
        if(isLoggedIn){
            const localStorageString = 'CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username;
            const idToken = localStorage.getItem(localStorageString + '.idToken');
            initConnection(idToken);
        }
    },[isLoggedIn])

    const initConnection = async (idToken) => {
        const socket = new WebSocket(process.env.REACT_APP_BROADCAST_URL,  + `?token=${idToken}`);
        setBroadcastConnection(socket);
    
        socket.onopen = (event) => {
            console.info("Broadcast connected: ", event);
            // renderConnect();
        };
    
        socket.onclose = (event) => {
            console.log('Broadcast closed.');
            handleBroadcastReconnect();
        };
    
        socket.onerror = (event) => {
            console.error("Broadcast websocket error observed:", event);
        };
    
        socket.onmessage = (event) => {
            const { broadcast } = JSON.parse(event.data);
            const update = {
                notification: broadcast,
                displayName: 'FightSync.live'
            };
            setBroadcasts([update]);
            setNotificationTimeout(true)
        };
        const handleBroadcastReconnect = () => {
            setTimeout(() => {
                // initConnection(idToken);
                console.log('broadcast reconnect commented out in layout.js.')
            },3000);
        }
    };

    useEffect(() => {
        if(broadcast.length > 0){
            broadcastConnection.send(JSON.stringify({ action: 'routeBroadcast', data: { broadcast }}));
            setNotificationTimeout(true);
        }
    },[broadcast]);
      
    // useEffect(() => {
    //     if(broadcasts.length > 0){

    //     }
    // },[broadcasts])
    // const socketActive = () => {
    //     return connection?.readyState === 1;
    // }
    const handleCloseNotification = e => {
        setBroadcasts([]);
    };
    useEffect(() => {
        if(notificationTimeout){
            const timer = setTimeout(() => {
                setBroadcasts([])
                setNotificationTimeout(false);
            }, 5000)
            return () => clearTimeout(timer);
        }
    },[notificationTimeout])
    return (
        <>  
            
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Box as="main">
                <Flex w={["100%","auto"]} position="fixed" top="1rem" right="0" flexDir="column" zIndex="1000">
                    {broadcasts?.length > 0 && broadcasts?.map( ({ notification, displayName }) => {
                        return (
                            <Notification
                                key={notification}
                                id={notification}
                                handleCloseNotification={handleCloseNotification}
                                notification={notification} 
                                displayName={displayName}
                            /> 
                        )
                    })}
                </Flex>    
                {children}
            </Box>
            <Footer/>
        </>
    )
}
