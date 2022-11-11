import { Flex, Heading } from '@chakra-ui/react'
import { parseEpoch } from '../../utils/utils'

export const FightMetadata = ({ 
    selectedSeasonFightSummary 
}) => {
    const { promoter, showTime } = selectedSeasonFightSummary?.show?.location ? selectedSeasonFightSummary.show : '';
    const fightQuickTitle = selectedSeasonFightSummary?.fight?.fightQuickTitle ? selectedSeasonFightSummary.fight.fightQuickTitle : '';
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
            minH='4rem'
        >
            <Heading 
                as="h2" 
                size="xl"
                color="#fafafa"
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
                minH="1.5rem"
            >
                { promoter ? promoter  : ''}
            </Heading>
        </Flex>
    )
}