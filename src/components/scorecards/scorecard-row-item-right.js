import {
    Flex,
    Select,
    useColorModeValue as mode
} from '@chakra-ui/react'
import { ArrowLinkButton } from '../buttons'
import { FaArrowRight } from 'react-icons/fa'
import { CopyIcon } from '@chakra-ui/icons'

export const ScorecardRowItemRight = ({
    fightId,
    handleSelectGroup,
    summary
}) => {

    const buttonData = [
        {
            icon: FaArrowRight,
            id: 'info',
            label: 'Fight Info',
            navigateTo: '#' // pass in fight ID.
        },
        {
            icon: FaArrowRight,
            id: 'leaderboard',
            label: 'Leaderboard',
            navigateTo: '#'
        },
        {
            icon: CopyIcon,
            id: 'copy',
            label: 'Share Scorecard',
            navigateTo: '#'
        }
    ]
    
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
            <Flex
                    flexDir="column"
                    justifyContent="center"
                    alignItems="flex-end"
                    w="100%"
            >
                { buttonData.map( data => {
                    return (
                        <ArrowLinkButton
                            icon={data.icon}
                            id={data.id}
                            label={data.label}
                            navigateTo={data.navigateTo}
                        />
                    )
                })}
            </Flex>

        </Flex>
    )
}