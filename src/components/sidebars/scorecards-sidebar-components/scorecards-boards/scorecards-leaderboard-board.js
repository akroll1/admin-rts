import { Flex, Heading } from '@chakra-ui/react'
import { ScorecardsBoard } from './scorecards-board'

const leaders = [
    {
        displayName: 'BadLeftHook',
        score: 475,
    },
    {
        displayName: 'Triple_up_the_Jab',
        score: 460,
    },
    {
        displayName: 'The Mongoose',
        score: 445,
    },
    {
        displayName: 'Easton Assasin 2',
        score: 430,
    },
    {
        displayName: 'Motorcity Cobra',
        score: 440,
    },
]

export const ScorecardsLeaderboardBoard = () => {
    return (
            <ScorecardsBoard
                label="Leaderboard"
            >
            { leaders.length > 0 && leaders.map( (leader, _i) => {
                return (
                    <Flex
                        key={leader.displayName}
                        flexDir="row"
                        alignItems="center"
                        justifyContent="space-between"
                        w="100%"
                        p="2"
                        mb="1"
                        borderRadius="md"
                        display="inline-flex"
                        border="1px solid #353535"
                        _hover={{
                            cursor: 'pointer',
                            bg: '#000'
                        }}
                    >
                        <Flex>
                            <Heading 
                                color="#aaaaaa"
                                as="h4" 
                                size="sm"
                                mr="2"
                                minW="2"
                                >
                                {`${_i+1} `}
                            </Heading>
                            <Heading 
                                _hover={{
                                    color: 'white'
                                }}
                                textAlign="center"
                                color="#cacaca"
                                as="h4" 
                                size="sm"
                            >
                                {`${leader.displayName} `}
                            </Heading>
                        </Flex>

                        <Heading 
                            as="h4" 
                            size="sm"
                            color="#cacaca"
                        >
                            {`${leader.score}`}
                        </Heading>
                    </Flex>
                )
            })}
        </ScorecardsBoard>
    )
}