import React, { useState, createRef, useRef, useEffect } from 'react'
import { Button, ButtonGroup, Divider, Flex, Input, Text } from '@chakra-ui/react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { ChatSidebar, FightStats } from './chat-sidebar-components'
import { stateStore } from '../../stores'
import { DividerWithText } from '../../chakra'

export const ChatSidebarRight = ({
    chatKey, 
    username, 
    setNotifications, 
    setNotificationTimeout,
    setIncomingScore,
    tabs,
    tokenConfig
}) => {
    // chatKey is room key for room ARN, required for chat metadata.
    const { chatScorecard, setChatScorecard } = stateStore.getState();
    const [moderator, setModerator] = useState(false);
    const [avatar, setAvatar] = useState({});
    const [chatToken, setChatToken] = useState(null);
    const [chatMessage, setChatMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    //////////////////////////////
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [powerShotDisabled, setPowerShotDisabled] = useState(false);
    const [prediction, setPrediction] = useState('');
    // refs
    const chatRef = createRef();
    const predictionRef = createRef();
    const messagesEndRef = createRef();
    
    const [connection, setConnection] = useState(null);
    const connectionRef = useRef(connection);
    connectionRef.current = connection;
    
    useEffect(() => {
        if(chatKey){
            handleRequestToken()
        }
    },[chatKey])
    
    useEffect(() => {
        if(chatScorecard?.scorecardId && socketActive()){
            console.log('handleSendMesage')
            handleSendMessage('UPDATE')
        }
    },[chatScorecard])
    const requestToken = (selectedUsername, isModerator, selectedAvatar) => {
        // Set application state
        setIsSubmitting(true);
        setModerator(isModerator);
        // setAvatar(selectedAvatar);
    
        const uuid = uuidv4();

        const permissions = isModerator
            ? ["SEND_MESSAGE", "DELETE_MESSAGE", "DISCONNECT_USER"]
            : ["SEND_MESSAGE"];
    
        const data = {
            chatKey,
            attributes: {
                username: `${username}`,
                // avatar: `${selectedAvatar.src}`,
            },
            capabilities: permissions,
            sessionDurationInMinutes: process.env.REACT_APP_TOKEN_REFRESH_IN_MINUTES,
            userId: `${username}`,
        };
    
        axios.post(`${process.env.REACT_APP_CHAT_TOKEN_SERVICE}`, data, tokenConfig)
            .then( res => {
                setChatToken(res.data);
                initConnection(res.data);
            })
            .catch( err => {
                setChatToken(null);
                console.log(err);
            }).finally(() => setIsSubmitting(false));
        // Focus the input field UI
        // chatRef.current.focus();
    };
    return (
        <Flex 
            display={window.innerWidth <= 768 && tabs.chat || window.innerWidth <= 768 && tabs.analytics ? 'flex' : window.innerWidth > 768 ? 'flex' : 'none'}
            id="chat-sidebar"
            flexDir="column" 
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            w="100%" 
            minH={["22rem"]} 
            maxH={["40vh", "40vh", "60vh"]}
            p="2" 
            bg="gray.900" 
            borderRadius="md" 
            overflowY="scroll"
        >
            <FightStats tabs={tabs} />
            <ChatSidebar tabs={tabs} />
        </Flex>
    )
}