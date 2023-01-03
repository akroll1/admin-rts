import { useEffect, useState } from 'react'
import { 
    Button,
    Flex, 
} from '@chakra-ui/react'
import { capFirstLetters } from '../../utils'

export const FighterSelectionButtons = ({
    evenRound,
    fighter,
    fighter1Id,
    fighter2Id,
    selectedFighterId,
    handleFighterSelect
}) => {
    console.log('selectedFighterId: ', selectedFighterId)
    return (
        <Button
            onClick={() => handleFighterSelect(fighter)}
            flex="0 0 45%"
            mt="2"
            mb="4"
            px="2"
            minH="3rem"
            variant={'outline'}
            py={["2", "2",]}
            size={["sm","md"]}
            border={selectedFighterId && selectedFighterId == fighter1Id ? "3px solid red" : "5px solid blue"}
            // borderColor={selectedFighterId && selectedFighterId == fighter.fighterId ? "red" : 'gray'}
        >
            {`${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`} 
        </Button>
    )
}