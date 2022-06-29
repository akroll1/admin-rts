import React, { useState, useRef, useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box, Flex } from '@chakra-ui/react'
import { Notification } from '../notifications'
import { useBroadcastStore, useUserStore } from '../../stores'

export const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
    // set broadcasts back to an empty string, here or in broadcast form...
    const message = useBroadcastStore( ({ broadcast }) => broadcast);
    const username = useUserStore( ({ username }) => username);

    const [broadcast, setBroadcast] = useState('');
    const [broadcastConnection, setBroadcastConnection] = useState(null);
    const connectionRef = useRef(broadcastConnection);
    connectionRef.current = broadcastConnection;
  

    useEffect(() => {
        const localStorageString = 'CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username;
        const accessToken = localStorage.getItem(localStorageString + '.accessToken');
        initConnection(accessToken);
    },[])
    
    useEffect(() => {
        if(message){
            setBroadcast(message);
            broadcastConnection.send(JSON.stringify({ action: 'routeBroadcast', data: { broadcast }}));
            // setNotificationTimeout(true);
        }
    },[message]);

    const initConnection = async (accessToken) => {
        const socket = new WebSocket(process.env.REACT_APP_BROADCAST_URL);
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
            // console.log('onmessage: ', event)
            const update = {
                notification: event.data,
                displayName: 'FightSync.live'
            };
            setBroadcast(update);
            setTimeout(() => {
                setBroadcast('')
            },5000)
        };
        const handleBroadcastReconnect = () => {
            setTimeout(() => {
                initConnection(accessToken);
                // console.log('broadcast reconnect commented out in layout.js.')
            },1000);
        }
    };
      
    // useEffect(() => {
    //     if(broadcasts.length > 0){

    //     }
    // },[broadcasts])
    const socketActive = () => {
        return broadcastConnection?.readyState === 1;
    }
    const handleCloseNotification = e => {
        setBroadcast('');
    };
    // useEffect(() => {
    //     if(notificationTimeout){
    //         const timer = setTimeout(() => {
    //             setBroadcast('')
    //             setNotificationTimeout(false);
    //         }, 5000)
    //         return () => clearTimeout(timer);
    //     }
    // },[notificationTimeout])

    const { notification, displayName } = broadcast ? broadcast : '';
    console.log('broadcast: ', broadcast)
    return (
        <>  
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Box as="main">
                    <Flex display={broadcast ? 'flex' : 'none'} w={["100%","100%"]} position="fixed" top="1rem" right="0" flexDir="column" zIndex="1000">
                        <Notification
                            id={notification}
                            handleCloseNotification={handleCloseNotification}
                            notification={notification} 
                            displayName={displayName}
                        /> 
                    </Flex>    
                {children}
            </Box>
            <Footer/>
        </>
    )
}

