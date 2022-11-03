import { Flex } from '@chakra-ui/react'
import { ScorecardsSeasonsBoard } from './scorecards-sidebar-components'

export const ScorecardsPageSidebar = () => { 

    return (
        <Flex 
            id="scorecards_sidebar" 
            flexDir="row"
            maxH={["40vh", "40vh", "60vh", "80vh"]}
            w="100%"
            flex="1 0 30%"
            overflow="scroll"
            flexWrap={["wrap-reverse", "wrap"]}
            alignItems="flex-start"
            justifyContent="flex-start"
            minH={["30vh", "40vh", "50vh"]}
        >
            <ScorecardsSeasonsBoard
                label="Seasons"
            />
        </Flex>
    )
}


