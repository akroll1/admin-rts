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

export const ScorecardsMetadataBoard = ({ label }) => {
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
            ];
            console.log('selectedFightSummary: ', selectedFightSummary)
            console.log('selectedFightSummaryMetadata: ', selectedFightSummaryMetadata)
            setFightSummary(selectedFightSummaryMetadata)
        }
    },[selectedFightSummary])

    return (
        <ScorecardsBoard
            label={label}
        >
            { fightSummary.length > 0 && fightSummary.map( (data, _i) => {
                return (  
                    <Flex
                        key={_i}
                        borderBottom="1px solid #303030"
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Heading 
                            p="1"
                            as="h4" 
                            size="sm"
                            textAlign="left"
                            color="#dadada"
                        >
                            {`${data.label}`}&#58; 
                        </Heading>
                        <Heading 
                            px="1"
                            as="h4" 
                            size="sm"
                            textAlign="left"
                            color="#cacaca"
                        >
                            {data.data}
                        </Heading>
                    </Flex>  
                )
            })}
        </ScorecardsBoard>
    )
}