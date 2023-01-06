import { 
    Button,
} from '@chakra-ui/react'
import { useGlobalStore } from '../../stores';
import { capFirstLetters } from '../../utils'

export const FighterSelectionButtons = ({
    evenRound,
    fighter,
    fighterIds,
    handleFighterSelect
}) => {

    const {
        fightComplete
    } = useGlobalStore()

    const { selectedFighterId } = fighterIds?.fighter1Id ? fighterIds : {};
    
    const setButtonColors = currentFighter => {
        let colorsObj = {
            bg: 'transparent',
            borderColor: 'gray.300',
            color: '#cacaca'
        }
        if(!selectedFighterId) return colorsObj
        if(evenRound) return colorsObj
        if(selectedFighterId && selectedFighterId == currentFighter){

            Object.assign(colorsObj, {
                bg: '#C01616',
                borderColor: 'gray.600',
                color: 'gray.100'
            })
            return colorsObj
        } 
        if(selectedFighterId && selectedFighterId != currentFighter){  

            Object.assign(colorsObj,{
                bg: '#blue',
                borderColor: 'gray.700',
                color: 'gray.400'
            })
            return colorsObj  
        }
    }
    const colors = setButtonColors(fighter.fighterId)

    return (    
        <Button
            disabled={fightComplete}
            onClick={() => handleFighterSelect(fighter.fighterId)}
            flex="0 0 45%"
            mt="2"
            mb="4"
            px="2"
            minH="2.5rem"
            maxH="2.5rem"
            variant={'outline'}
            py={["2", "2",]}
            bg={colors.bg}
            size={["sm","md"]}
            color={colors.color}
            // borderColor={colors.borderColor}s
            border="1px solid"
            _hover={{
                bg: '',
                borderColor: 'gray.400',
                color: '#fcfcfc'
            }}
            _focus={{
                borderColor: 'transparent'
            }}
            // borderColor={selectedFighterId && selectedFighterId == fighter.fighterId ? "red" : 'gray'}
        >
            {`${capFirstLetters(fighter.firstName)} ${capFirstLetters(fighter.lastName)}`} 
        </Button>
    )
}