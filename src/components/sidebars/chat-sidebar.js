import { 
    useEffect,
    useRef,    
    useState 
} from 'react'
import {
    Box,
    Flex,
    Heading,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react'
import {
    ChatEnum,
    ChatTokenEnum,
    ContentType,
    TabsEnum,
    useGlobalStore,
} from '../../stores'
import { v4 as uuidv4 } from 'uuid'
import { GroupChatPanel, FightChatPanel } from './scoring-sidebar-components'

export const ChatSidebar = () => {

    const { 
        tabs,
    } = useGlobalStore()

    const [tabIndex, setTabIndex] = useState(0)

    const handleTabsChange = (index) => {
        setTabIndex(index)
    }

    return (
        <Flex 
            display={tabs[TabsEnum.ALL] || tabs[TabsEnum.CHAT] ? 'flex' : 'none'}
            bg="fsl-sidebar-bg"
            border="1px solid #252525"
            id="chat-sidebar"
            flex={["1 0 25%"]} 
            maxW={["100%", "100%", "40%"]} 
            borderRadius="md" 
            overflow="hidden"
            position="relative"
            justifyContent="space-between"
            flexDir="column" 
            minH="100%"
            pb="4"
        >
            <Tabs 
                w="100%"
                isFitted 
                variant='enclosed' 
                minH="85%"
                maxH="85%"
                onChange={handleTabsChange}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
            >
                <TabList mb='1em' className='group_chat'>
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
                    justifyContent="space-between"
                    minH="100%"
                    maxH="100%"
                >
                    <TabPanel>
                        <GroupChatPanel />
                    </TabPanel>
                    <TabPanel>
                        <FightChatPanel />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
}