import { Flex } from '@chakra-ui/react'
import { ScorecardsSeasonsBoard } from './scorecards-sidebar-components'
import { ScorecardsInvitationsBoard } from './scorecards-sidebar-components'

export const ScorecardsPageSidebar = () => { 

    return (
        <Flex 
            id="scorecards_sidebar" 
            flexDir="row"
            maxH={["70vh"]}
            w="100%"
            flex="1 0 30%"
            overflow="scroll"
            flexWrap={["wrap-reverse", "wrap-reverse", "wrap"]}
            alignItems="flex-start"
            justifyContent="flex-start"
            h="auto"
        >
            <ScorecardsSeasonsBoard />
            <ScorecardsInvitationsBoard />
        </Flex>
    )
}


