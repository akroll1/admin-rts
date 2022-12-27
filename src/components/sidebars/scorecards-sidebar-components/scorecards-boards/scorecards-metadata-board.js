import { 
    Flex,
    Heading
} from '@chakra-ui/react'
import { 
    useEffect,
    useState
} from 'react';
import { useGlobalStore } from '../../../../stores';
import { 
    capFirstLetters, 
    transformedWeightclass 
} from '../../../../utils';
import { ScorecardsBoard } from './scorecards-board';

export const ScorecardsMetadataBoard = () => {
    const { 
        selectedSeasonFightSummary
    } = useGlobalStore()
    
    const [fightSummary, setFightSummary] = useState([])

    // console.log('selectedSeasonFightSummary: ', selectedSeasonFightSummary)
    const getFightDisposition = selectedSeasonFightSummary => {
        const { fight, fighters } = selectedSeasonFightSummary;
        if(fight.fightStatus === 'CANCELED') return `Canceled`;
        if(fight.fightStatus === 'PENDING') return `Upcoming`;
        if(fight.fightStatus === 'COMPLETE'){
            if(fight.officialResult.slice(37) === `DR`) return `Draw`;
            const winner = fight.officialResult[fighters[0].fighterId] ? fighters[0].lastName : fighters[0].lastName;
            if(fight.officialResult.slice(37) === `SD`){
                return `${winner}- Split Decision`
            }
            return `${capFirstLetters(winner)}- ${fight.officialResult.slice(37)}`
        }
    }

    useEffect(() => {
        if(selectedSeasonFightSummary?.fighters?.length){
            const selectedSeasonFightSummaryMetadata = [
                {
                    label: `Result`,
                    data: `${getFightDisposition(selectedSeasonFightSummary)}`
                },
                {
                    label: `Rounds`,
                    data: `${selectedSeasonFightSummary.fight.rounds}`
                },
                {
                    label: `Weightclass`,
                    data: `${transformedWeightclass(selectedSeasonFightSummary.fight.weightclass)}`
                },
                {
                    label: `Title Fight`,
                    data: `${selectedSeasonFightSummary.fight.isTitleFight ? `Yes` : `No`}`
                },
                {
                    label: `Location`,
                    data: `${selectedSeasonFightSummary.show.location}`
                },
                {
                    label: `Links`,
                    data: ``
                },
            ];
            setFightSummary(selectedSeasonFightSummaryMetadata)
        }
    },[selectedSeasonFightSummary])

    return (
        <Flex
            flex="1 0 45%"
        >
            <ScorecardsBoard
                label={selectedSeasonFightSummary?.fight?.fightQuickTitle ? selectedSeasonFightSummary?.fight?.fightQuickTitle : `Result`}
            >
                { fightSummary.length > 0 && fightSummary.map( (data, _i) => {
                    return (  
                        <Flex
                            key={_i}
                            borderBottom="1px solid #303030"
                            display="inline-flex"
                            alignItems="center"
                            justifyContent="center"
                            minH="1.5rem"
                        >
                            <Heading 
                                p="1"
                                as="h4" 
                                size="sm"
                                textAlign="left"
                                color="fsl-subdued-text"
                            >
                                {`${data.label}`}&#58; 
                            </Heading>
                            <Heading 
                                px="1"
                                as="h4" 
                                size="sm"
                                textAlign="left"
                                color="fsl-highlight-heading-text"
                            >
                                {data.data}
                            </Heading>
                        </Flex>  
                    )
                })}
            </ScorecardsBoard>
        </Flex>
    )
}