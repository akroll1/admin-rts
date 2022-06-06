import React, { useState, useRef, useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box, Flex } from '@chakra-ui/react'
import { Notification } from '../notifications'

export const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
    const [broadcasts, setBroadcasts] = useState([
        {
            notification: 'notification',
            displayName: 'displayName'
        }
    ]);
    // const [broadcasts, setBroadcasts] = useState([]);
    const [connection, setConnection] = useState(null);
    const connectionRef = useRef(connection);
    connectionRef.current = connection;
    
    useEffect(() => {
        if(isLoggedIn){
            const username = sessionStorage.getItem('username');
            const localStorageString = 'CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username;
            const idToken = localStorage.getItem(localStorageString + '.idToken');
            initConnection(idToken);
        }
    },[isLoggedIn])

    const initConnection = async (idToken) => {
        const connectionInit = new WebSocket(process.env.REACT_APP_BROADCAST_URL,  + `?token=${idToken}`);
        setConnection(connectionInit);
    
        connectionInit.onopen = (event) => {
            console.info("Broadcast connected: ", event);
            // renderConnect();
        };
    
        connectionInit.onclose = (event) => {
            console.log('Broadcast closed.');
            // handleBroadcastReconnect();
        };
    
        connectionInit.onerror = (event) => {
            console.error("Broadcast websocket error observed:", event);
        };
    
        connectionInit.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const eventType = data["Type"];
    
            switch (eventType) {
            case "EVENT":
                console.info("Received event:", data);
                // handleEvent(data);
                break;
            case "ERROR":
                console.info("Received error:", data);
                // handleError(data);
                // implement the error message.
                break;
            case "MESSAGE":
                // handleReceiveMessage(data)
                setBroadcasts(data);
                break;
            default:
                console.error("Unknown message received:", event);
            }
        };
    };
    const handleCloseNotification = e => {
        const { id } = e.currentTarget;
        const temp = broadcasts
        const filtered = temp.filter( ({ notification }) => notification !== id);
        setBroadcasts(filtered)
    };
    return (
        <>  
            
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Box as="main">
                <Flex w={["100%","auto"]} position="fixed" top="1rem" right="0" flexDir="column" zIndex="1000">
                    {broadcasts.length > 0 && broadcasts.map( ({ notification, displayName }) => {
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
