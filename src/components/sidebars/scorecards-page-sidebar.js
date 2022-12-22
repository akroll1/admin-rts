import { Flex } from '@chakra-ui/react'
import { ScorecardsInvitationsBoard } from './scorecards-sidebar-components'

export const ScorecardsPageSidebar = () => { 


    return (
        <Flex 
            id="scorecards_page_sidebar" 
            flexDir="column"
            w="100%"
            flex="1 0 25%"
            overflow="scroll"
            flexWrap={["wrap-reverse", "wrap-reverse", "wrap"]}
            alignItems="flex-start"
            justifyContent="flex-start"
            boxSizing="border-box"
        >   
            <ScorecardsInvitationsBoard />
        </Flex>
    )
}


