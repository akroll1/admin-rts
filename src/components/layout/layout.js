import React, { useState, useRef, useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box, Flex } from '@chakra-ui/react'
import { Notification } from '../notifications'
import { broadcastStore, userStore } from '../../stores'

export const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
    const message = broadcastStore( ({ broadcast }) => broadcast);
    const username = userStore( ({ username }) => username);

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
            broadcastConnection.send(JSON.stringify({ action: 'routeBroadcast', data: message }));
        }
    },[message]);

    const initConnection = async (accessToken) => {
        const socket = new WebSocket(process.env.REACT_APP_BROADCAST_URL);
        setBroadcastConnection(socket);
    
        socket.onopen = (event) => {
            console.info("Broadcast connected: ", event);
        };
    
        socket.onclose = (event) => {
            handleBroadcastReconnect();
        };
    
        socket.onerror = (event) => {
            console.error("Broadcast websocket error event:", event);
        };
    
        socket.onmessage = (event) => {
            // console.log('onmessage: ', event)
            const update = {
                notification: JSON.parse(event.data).data,
                displayName: 'FightSync.live'
            };
            setBroadcast(update);
            setTimeout(() => {
                setBroadcast('')
            },50000)
        };
        const handleBroadcastReconnect = () => {
            setTimeout(() => {
                initConnection(accessToken);
            },1000);
        }
    };

    const socketActive = () => {
        return broadcastConnection?.readyState === 1;
    }
    const handleCloseNotification = e => {
        setBroadcast('');
    };

    const { notification, displayName } = broadcast ? broadcast : '';
    // console.log('broadcast: ', broadcast)
    return (
        <>  
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Box as="main">
                <Flex 
                    display={broadcast ? 'flex' : 'none'} 
                    w={["100%","100%"]} 
                    position="fixed" 
                    top="1rem" 
                    right="0" 
                    flexDir="column" 
                    zIndex="100000"
                >
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

