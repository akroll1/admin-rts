import { useEffect, useState } from 'react'
import {
    Button,
    Divider,
    Fade,    
    Flex,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
import { useGlobalStore } from '../../stores'
  
export const GlobalNotification = () => {
    
    const {
        chatMessage,
        setGlobalNotification,
    } = useGlobalStore()

    const [displayNotification, setDisplayNotification] = useState(true)
    const [notications, setNotifications] = useState([])

    useEffect(() => {
        if(chatMessage?.body){
            setDisplayNotification(true)
            const notificationTimer = setTimeout(() => {
                setDisplayNotification(false)
            },10000)
            return () => clearTimeout(notificationTimer)
        } else {
            setDisplayNotification(false)
        }
    }, [chatMessage])

    const clearNotification = () => {
        setDisplayNotification(false)
        setGlobalNotification(null)
    }

    return (    
        <Fade initialScale={0.9} in={displayNotification} unmountOnExit>
            <Flex
                id="globalNotification"
                position="fixed"
                top={["10"]}
                right={["2", "2"]}
                m={["10 auto"]}
                w={["100%"]}
                boxShadow={useColorModeValue('md', 'md-dark')}
                bg="rgba(0,0,0,0.9)"
                borderRadius="lg"
                border="1px solid #2D3748"
                minH="4rem"
                p="1"
                zIndex="10000"
                maxW={["90%","70%", "50%","50%"]}
            >
                <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="space-around"
                    p="4"
                >
                    <Flex 
                        flex="1 0 80%"
                        flexDir="column"
                        alignItems="flex-start"
                        justifyContent="center"
                    >
                        <Text 
                            fontWeight="bold" 
                            fontSize="sm"
                        >
                            {chatMessage?.heading ? chatMessage.heading : ''}
                        </Text>
                        <Text color="muted" fontSize="sm">
                            {chatMessage?.body ? chatMessage.body : ''}
                        </Text>
                    </Flex>
                    <Divider 
                        p="-2"
                        orientation='vertical'
                        bg="gray.300" 
                    />
                    <Flex>
                        <Button 
                            _hover={{color: 'whiteAlpha.900'}}
                            variant="ghost" 
                            color="blue.300" 
                            onClick={clearNotification}
                        >
                            Clear
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Fade>
    )
}
