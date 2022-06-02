import React, { useState, useRef, useEffect } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'
import { Box } from '@chakra-ui/react'

export const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
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
                break;
            default:
                console.error("Unknown message received:", event);
            }
        };
    };
    return (
        <> 
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Box as="main">{children}</Box>
            <Footer/>
        </>
    )
}
