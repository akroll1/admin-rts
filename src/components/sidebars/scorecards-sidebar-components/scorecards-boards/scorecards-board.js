import { Flex } from '@chakra-ui/react'
import { ScorecardsBoardsHeaders } from './scorecards-boards-header'

export const ScorecardsBoard = props => {
    return (
        <Flex
            id="scorecards_leaderboard"
            bg="#111111"
            position="relative"
            w="100%"
            flexDir="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            border="1px solid #383838"
            borderRadius="md"
            p="2"
            my="1"
            minH="25vh"
        >
            <ScorecardsBoardsHeaders
                {...props}
            />
                {props.children}
        </Flex>
    )
}