import React, { useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { ChatSidebar, FightStats } from './chat-sidebar-components'
import { useScorecardStore } from '../../stores'
import { Notification } from '../notifications'

export const ScoringSidebarRight = ({
    tabs,
}) => {    
    const {
        activeGroupScorecard
    } = useScorecardStore()
    const chatKey = activeGroupScorecard.chatKey
    
    const [notificationTimeout, setNotificationTimeout] = useState(false);
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        if(notifications.length > 0){
            const timer = setTimeout(() => {
                const temp = notifications;
                temp.shift(temp.length -1)
                setNotifications(temp);
                // setNotificationTimeout(prev => !prev);
            }, 10000)
            return () => clearTimeout(timer);
        }
    },[notificationTimeout])

    const handleCloseNotification = e => {
        const { id } = e.currentTarget;
        const temp = notifications
        const filtered = temp.filter( ({ notification }) => notification !== id);
        setNotifications(filtered)
    };
    return (
        <Flex 
            display={(tabs.all || tabs.chat) ? 'flex' : 'none'}
            id="scoring-sidebar-right"
            flexDir="column" 
            flex={["1 0 25%", "1 0 25%", "1 0 25%", "1 0 20%"]} 
            w="100%" 
            p="2" 
            bg={tabs.all ? "fsl-sidebar-bg" : "inherit"}
            borderRadius="md" 
            minH={tabs.chat ? "75vh" : "100%"}
        > 
            <Flex 
                w={["100%","auto"]} 
                position="fixed" 
                top="3rem" 
                right="0" 
                flexDir="column" 
                zIndex="10000"
            >
            {notifications.length > 0 && notifications.map( ({notification, username}) => {
                return (
                    <Notification
                        key={notification}
                        id={notification}
                        handleCloseNotification={handleCloseNotification}
                        notification={notification} 
                        username={username}
                    /> 
                )})}
            </Flex>  
            <ChatSidebar 
                setNotifications={setNotifications}
                setNotificationTimeout={setNotificationTimeout}
                tabs={tabs} 
            />
        </Flex>
    )
}