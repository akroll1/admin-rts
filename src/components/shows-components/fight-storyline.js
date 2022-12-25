import { useEffect, useState } from 'react'
import { 
    Button,
    Collapse,
    Flex, 
    Text 
} from '@chakra-ui/react'

export const FightStoryline = ({ 
    selectedFightSummary 
}) => {
    const fightStoryline = selectedFightSummary?.fight?.fightStoryline.slice(0, 1200);
    const [showFullStoryline, setShowFullStoryline] = useState(false)

    return (
        <Flex 
            id="fight_storyline"
            as="section"
            alignItems="flex-start"
            flexDir="column" 
            px={['2', '4', '8']} 
            mb="2"
            color="fsl-text"
            w="100%"
        >
            <Collapse startingHeight={'4rem'} in={showFullStoryline} animateOpacity>
                <Text>
                    {fightStoryline}
                </Text>
            </Collapse>
            <Button 
                size='sm' 
                onClick={() => setShowFullStoryline(prev => !prev)} 
                mt='1rem'
                variant="outline"
            >
                Show {showFullStoryline ? 'Less' : 'More'}
            </Button>
        </Flex>
    )
}