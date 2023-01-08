import { 
    useState 
} from 'react'
import {
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Input,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react'
import {
    ChatMessageType,
    TabsEnum,
    useGlobalStore,
} from '../../stores'
import { 
    FightChatPanel,
    GroupChatPanel 
} from './scoring-sidebar-components'

export const ChatSidebar = () => {

    const { 
        tabs,
        user,
    } = useGlobalStore()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [tabIndex, setTabIndex] = useState(0)
    const [groupChat, setGroupChat] = useState({
        contentType: '',
        message: '', 
        sendMessage: false, 
        socketActive: false
    })

    const [fightChat, setFightChat] = useState({
        contentType: '',
        message: '',
        sendMessage: false,
        socketActive: false,
    })

    const handleTabsChange = (index) => {
        setTabIndex(index)
    }

    const handleChatChange = e => {
        const { value } = e.currentTarget;
        if(tabIndex == "0"){
            setGroupChat({ ...groupChat, message: value })
        }
        if(tabIndex == "1"){
            setFightChat({ ...fightChat, message: value })
        }
    };

    const handleChatKeydown = e => {
        if (e.key === "Enter") {
            if(tabIndex == '0'){
                if (groupChat.message) {
                    handleSendMessage(e, ChatMessageType.GROUP);
                    // setChatMessage("");
                }
            }
            if(tabIndex == '1'){
                if(fightChat.message){
                    handleSendMessage(e, ChatMessageType.FIGHT)
                }
            }
        }
    };

    const isGroupTab = tabIndex == "0";

    const handleSendMessage = e => {
        const { id } = e.currentTarget;
        if(isGroupTab){
            setGroupChat({ 
                ...groupChat, 
                contentType: id === ChatMessageType.CALLING_IT ? ChatMessageType.CALLING_IT : ChatMessageType.GROUP,
                sendMessage: true
            })
        }
        if(!isGroupTab){
            setFightChat({ 
                ...fightChat, 
                contentType: id === ChatMessageType.CALLING_IT ? ChatMessageType.CALLING_IT : ChatMessageType.GROUP,
                sendMessage: true 
            })
        }
    }

    const isDisabled = () => {
        if(isGroupTab) return groupChat.socketActive ? false : true
        if(!isGroupTab) return fightChat.socketActive ? false : true
    }
    // console.log('fightChat: ', fightChat)
    // console.log('groupChat: ', groupChat)
    return (
        <Flex 
            display={tabs[TabsEnum.ALL] || tabs[TabsEnum.CHAT] ? 'flex' : 'none'}
            bg="fsl-sidebar-bg"
            border="1px solid #252525"
            id="chat-sidebar"
            flex={["1 0 25%"]} 
            maxW={["100%", "100%", "40%"]} 
            borderRadius="md" 
            // overflow="hidden"
            position="relative"
            justifyContent="space-between"
            flexDir="column" 
            minH="100%"
            maxH="100%"
            pb="4"
        >
            <Flex
                flexDir="column"
                w="100%"
            >
                <Tabs 
                    w="100%"
                    isFitted 
                    variant='enclosed' 
                    minH="85%"
                    onChange={handleTabsChange}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                >
                    <TabList 
                        mb='1em' 
                        id='group_chat'
                    >
                        <Tab
                            _focus={{borderBottom: "1px solid tranparent"}}>
                            <Heading 
                                fontSize="lg"
                                color={tabIndex == '0' ? 'whiteAlpha.900' : 'gray.400'}
                            >
                                Group
                            </Heading>
                        </Tab>
                        <Tab
                            _focus={{borderBottom: "1px solid white"}}>
                            <Heading 
                                fontSize="lg"
                                color={tabIndex == '1' ? 'whiteAlpha.900' : 'gray.400'}
                            >
                                Panelists
                            </Heading>
                        </Tab>
                    </TabList>
                    <TabPanels
                        display="flex"
                        flexDir="column"
                        justifyContent="flex-end"
                        maxH="100%"
                    >
                        <TabPanel
                            overflow="scroll"
                        >
                            <GroupChatPanel
                                groupChat={groupChat}
                                setGroupChat={setGroupChat}
                            />
                        </TabPanel>
                        <TabPanel>
                            <FightChatPanel 
                               fightChat={fightChat}
                               setFightChat={setFightChat}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                <Flex
                    h="auto"
                    w="100%"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="flex-end"
                    pt="4"
                >
                    <Input
                        id="group_input"
                        w="90%"
                        bg="#202020"
                        m="auto"
                        mb="1"
                        as="input"
                        size="sm"
                        type="text"
                        color="whiteAlpha.900"
                        _placeholder={{ 
                            color: 'whiteAlpha.700',
                            opacity: '0.6'
                        }}
                        placeholder={isGroupTab ? `Group Chat` : `Panelist Chat`}
                        disabled={isDisabled()}
                        value={tabIndex == "0" ? groupChat.message : fightChat.message}
                        maxLength={150}
                        onChange={handleChatChange}
                        onKeyDown={handleChatKeydown}
                    />
                    <ButtonGroup 
                        px="4" 
                        w="100%"
                        mt="2"
                    >
                        <Button     
                            w="100%"
                            m="1"
                            size="sm"
                            id={'test'}
                            isLoading={isSubmitting} 
                            loadingText="Joining..." 
                            onClick={handleSendMessage} 
                            variant="solid"
                            onKeyDown={handleChatKeydown}
                            disabled={isDisabled()}
                        >
                            {isGroupTab && groupChat.socketActive ? `Send` : !isGroupTab && fightChat.socketActive ? `Send` : `Join Chat`}
                        </Button>
                        <Button     
                            w="100%"
                            minH="1.5rem"
                            m="1"
                            p="1"
                            size="sm"
                            id={ChatMessageType.CALLING_IT}
                            disabled={isDisabled()}
                            loadingText="Joining..." 
                            onClick={handleSendMessage} 
                            variant="outline"
                            colorScheme="red"
                            color='#dadada'
                        >
                            Calling It
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Flex>
        </Flex>
    )
}