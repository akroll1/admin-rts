import { useState } from 'react'
import { 
    Flex,
} from '@chakra-ui/react'
import { useScorecardStore } from '../../stores'

import { 
    ScorecardsLeaderboardBoard,
    ScorecardsMetadataBoard,
    ScorecardsSeasonsBoard
} from './scorecards-sidebar-components'

export const ScorecardsPageSidebar = () => { 
    const { 
    
    } = useScorecardStore()

   
    return (
        <Flex 
            id="scorecards_sidebar" 
            flexDir="row"
            maxH={["60vh", "80vh"]}
            w="100%"
            flex="1 0 30%"
            overflow="scroll"
            flexWrap={["wrap-reverse", "wrap"]}
            alignItems="flex-start"
            justifyContent="flex-start"
        >
            <Flex
                flexWrap={["wrap"]}
                w="100%"
            >
                <ScorecardsSeasonsBoard
                    label="Seasons"
                />
                <ScorecardsMetadataBoard 
                    label="Result"
                />
            </Flex>
            <ScorecardsLeaderboardBoard 
                label="Leaderboard"
            />
        </Flex>
    )
}


