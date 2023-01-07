import {
    Button,
    ButtonGroup,
    Flex,
    Select,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { CopyIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router'

export const ScorecardRowItemRight = ({
    fightId,
    handleSelectGroup,
    summary
}) => {
    const navigate = useNavigate()
    return (
        <Flex
            width="100%"
            justifyContent="space-between"
            display={['none','flex']}
        >
            <Select
                cursor="pointer"
                alignContent="flex-start"
                alignSelf="flex-start"
                maxW="50%"
                placeholder={summary?.scorecardGroups.length === 1 ? 'Scorecard' : `${summary?.scorecardGroups.length} Groups`}
                aria-label="groups"
                focusBorderColor={mode('blue.500', 'blue.200')}
                onChange={e => handleSelectGroup(e.currentTarget.value)}
            >
                { summary.scorecardGroups.map( (card, _i) => {
                    // console.log('card: ', card)
                    return (
                        <option 
                            value={card.groupScorecardId}
                            key={_i}
                        >
                            {card.groupScorecardName}
                        </option>
                    )
                })}
            </Select>
            <ButtonGroup
                flexDir="column"
                alignItems="flex-end"
            >

                <Button 
                    p="0"
                    color="gray.300"
                    _hover={{color: "#fff"}}
                    bg="transparent"
                    variant="ghost"
                    size="sm" 
                    fontSize="sm" 
                    rightIcon={<FaArrowRight />}
                    // onClick={() => navigate(`/leaderboard/${fightId}`)}
                >
                    Leaderboard
                </Button>
                <Button 
                    p="0"
                    color="gray.300"
                    _hover={{color: "#fff"}}
                    bg="transparent"
                    variant="ghost"
                    size="sm" 
                    fontSize="sm" 
                    rightIcon={<CopyIcon />}
                    // onClick={() => navigate(`/leaderboard/${fightId}`)}
                >
                    Share Scorecard
                </Button>
            </ButtonGroup>

        </Flex>
    )
}