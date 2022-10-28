import { Flex, Heading } from '@chakra-ui/react'
import { parseEpoch } from '../../utils/utils'

export const FightMetadata = ({ 
    selectedFightSummary 
}) => {
    const { location, promoter, showTime } = selectedFightSummary?.show?.location ? selectedFightSummary.show : '';
    const fightQuickTitle = selectedFightSummary?.fight?.fightQuickTitle ? selectedFightSummary.fight.fightQuickTitle : '';
    return (
        <Flex 
            as="section" 
            w="100%"
            borderRadius="5px" 
            bg="transparent" 
            p="2" 
            flexDir="column" 
            alignItems="center" 
            justifyContent="center"
            textAlign="center"
            mt="4"
        >
            <Heading 
                letterSpacing="1px" 
                as="h2" 
                size="xl"
                >
                    { fightQuickTitle ? fightQuickTitle : ''}
                </Heading>
            <Flex
                w={["100%", "100%"]}
                alignItems="center"
                justifyContent="center"
            >
            </Flex>
            <Heading 
                color="fsl-text" 
                fontWeight="normal" 
                as="h3" 
                size="sm"
                >
                    { showTime ? parseEpoch(showTime) : ''}
                </Heading>
            <Heading 
                p="1" 
                letterSpacing="1px" 
                as="h3" 
                size="md"
                color="#dadada"
                py="0"
            >
                { promoter ? promoter  : ''}
            </Heading>
        </Flex>
    )
}