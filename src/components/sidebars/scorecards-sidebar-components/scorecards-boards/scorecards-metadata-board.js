import { 
    Flex,
    Heading
} from '@chakra-ui/react'
import { 
    useEffect,
    useState
} from 'react';
import { useScorecardStore } from '../../../../stores';
import { 
    capFirstLetters, 
    transformedWeightclass 
} from '../../../../utils';
import { ScorecardsBoard } from './scorecards-board';

export const ScorecardsMetadataBoard = () => {
    const { 
        selectedFightSummary = {}
    } = useScorecardStore()
    
    const [fightSummary, setFightSummary] = useState([])

    // console.log('selectedFightSummary: ', selectedFightSummary)
    const getFightDisposition = selectedFightSummary => {
        const { fight, fighters } = selectedFightSummary;
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
        if(selectedFightSummary?.fighters?.length){
            const selectedFightSummaryMetadata = [
                {
                    label: `Result`,
                    data: `${getFightDisposition(selectedFightSummary)}`
                },
                {
                    label: `Rounds`,
                    data: `${selectedFightSummary.fight.rounds}`
                },
                {
                    label: `Weightclass`,
                    data: `${transformedWeightclass(selectedFightSummary.fight.weightclass)}`
                },
                {
                    label: `Title Fight`,
                    data: `${selectedFightSummary.fight.isTitleFight ? `Yes` : `No`}`
                },
                {
                    label: `Location`,
                    data: `${selectedFightSummary.show.location}`
                },
                {
                    label: `Links`,
                    data: ``
                },
            ];
            setFightSummary(selectedFightSummaryMetadata)
        }
    },[selectedFightSummary])

    return (
        <Flex
            flex="1 0 45%"
        >
            <ScorecardsBoard
                label={selectedFightSummary?.fight?.fightQuickTitle ? selectedFightSummary?.fight?.fightQuickTitle : `Result`}
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