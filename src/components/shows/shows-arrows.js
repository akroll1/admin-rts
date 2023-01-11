import { useEffect, useState } from 'react'
import { 
    Box,
    Button,
    Flex, 
    IconButton, 
} from '@chakra-ui/react'
import { 
    ArrowRightIcon, 
    ArrowLeftIcon,
    ChevronLeftIcon, 
    ChevronRightIcon,
    TriangleUpIcon,
    TriangleDownIcon,
} from '@chakra-ui/icons'
import { useGlobalStore } from '../../stores'

export const ShowsArrows = () => {
    const [currentFightId, setCurrentFightId] = useState('')
    
    const { 
        selectedSeasonFightSummaries,
        selectedSeasonSummary,
        setSelectedFightSummary,
    } = useGlobalStore() 

    useEffect(() => {
        if(selectedSeasonFightSummaries?.length > 0){
            setCurrentFightId(selectedSeasonFightSummaries[0].fight.fightId)
        }
    },[selectedSeasonFightSummaries])

    const rotateFighters = e => {
        const { id } = e.currentTarget;

        const calculateNextIndex = (currentFightId, arrow) => {
            const direction = arrow === 'right' ? 1 : -1;
            const length = selectedSeasonSummary.length;
            const currentIndex = selectedSeasonFightSummaries.findIndex( summary => summary.fight.fightId === currentFightId)

            let nextIndex = currentIndex + direction;
            if(nextIndex < 0){
                return length - 1
            }
            if(nextIndex > (length - 1)){
                return 0
            }
            
            return nextIndex
        }
        
        const nextFightIndex = calculateNextIndex(currentFightId, id)
        const nextFightSummary = selectedSeasonFightSummaries[nextFightIndex]
        setCurrentFightId(nextFightSummary.fight.fightId)
        setSelectedFightSummary(nextFightSummary.fight.fightId)
    }


    return (
        <Flex
            position="absolute"
            top="80px"
            justifyContent="space-between"
            alignItems="space-between"
            zIndex="5000"
            boxSizing="border-box"
            px={["0", "4", "4", "8", "12"]}
            color="whiteAlpha.600"
            w="100%"
        >

            <Button
                id="left"
                onClick={rotateFighters}
                fontSize={["2.5rem", "4rem"]}
                className="group"
                fontWeight="bold"
                iconSpacing="3"
                colorScheme="solid"
                variant="link"
                color="gray.300"
                _hover={[
                    {
                        color: '#fff',
                        textDecor: "none",
                        transition: "transform 0.2s"},
                    {
                        color: '#fff',
                        textDecor: "none",
                        transition: "transform 0.2s",
                        transform: 'translateX(-3px)'
                    }
                ]}
                _focus={{
                    borderColor: 'tranparent'
                }}
                leftIcon={
                    <Box
                        transform="rotate(90deg)"
                        as={TriangleDownIcon}
                    />
                }
            />
            <Button
                id="right"
                onClick={rotateFighters}
                fontSize={["2.5rem", "4rem"]}
                className="group"
                fontWeight="bold"
                iconSpacing="3"
                colorScheme="solid"
                variant="link"
                color="gray.300"
                _hover={[
                    {
                        color: '#fff',
                        textDecor: "none",
                        transition: "transform 0.2s"},
                    {
                        color: '#fff',
                        textDecor: "none",
                        transition: "transform 0.2s",
                        transform: 'translateX(3px)'
                    }
                ]}
                _focus={{
                    borderColor: 'tranparent'
                }}
                rightIcon={
                    <Box
                        transform="rotate(90deg)"
                        as={TriangleUpIcon}
                    />
                }
            />
        </Flex>
    )
}