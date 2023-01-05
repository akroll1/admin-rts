import { useState } from 'react'
import { 
    Button,
    Collapse,
    Flex, 
    Text 
} from '@chakra-ui/react'
import { replaceNewLineWithBreaks } from '../../stores/stores/utils-store'

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
            <Collapse startingHeight={'4.5rem'} in={showFullStoryline} animateOpacity>
                <Text
                    dangerouslySetInnerHTML={{ __html: replaceNewLineWithBreaks(fightStoryline ? fightStoryline : '')}}
                />
            </Collapse>
                { fightStoryline && 
                    <Button 
                        size='sm' 
                        onClick={() => setShowFullStoryline(prev => !prev)} 
                        variant="outline"
                        border="1px solid black"
                        borderColor="#404040"
                        color="#bababa"
                        mt="2"
                        _focus="1px solid black"
                        _hover={{
                            border: '1px solid black',
                            color: 'white'
                        }}
                    >
                        Show {showFullStoryline ? 'Less' : 'More'}
                    </Button>
                }
        </Flex>
    )
}