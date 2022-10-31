import { 
    Flex, 
    Heading, 
    useColorModeValue, 
} from '@chakra-ui/react'
import { SidebarsDividerWithText } from '../../../chakra';
import { useScorecardStore } from '../../../stores';
import { capFirstLetters, parseEpoch, transformedWeightclass } from '../../../utils';
import { ArrowUpDownIcon } from '@chakra-ui/icons';

const leaders = [
    {
        displayName: 'BadLeftHook',
        score: 475,
    },
    {
        displayName: 'Triple_up_the_Jab',
        score: 460,
    },
    {
        displayName: 'Easton Assasin 2',
        score: 445,
    },
    {
        displayName: 'Motorcity Cobra',
        score: 440,
    },
]

const ColumnHeading = ({ 
    label, 
    size 
}) => {
    return (
        <Heading 
            w="100%"
            textAlign="center"
            fontWeight="bold" 
            fontSize={size} 
            lineHeight="1.25rem" 
            margin="auto"
            color="#fafafa"
        >
            {label}
        </Heading>    
    )
}


const Column = props => {
    const { leaders, selectedFightSummary } = props
    return (
        <Flex
            bg="#252525"
            position="relative"
            w="100%"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            mb="4"
            pb="2"
            border="1px solid #6f6f6f"
            borderRadius="sm"
        >
            <ArrowUpDownIcon 
                position="absolute"
                top="3"
                left="1"
                fontSize="0.9rem"
                color="gray"
                _hover={{
                    cursor: 'pointer'
                }}
            />

            <SidebarsDividerWithText
                py="4"
                label={leaders && Array.isArray(leaders) ? `Leaderboard` : `Result`}
                fontSize="xl"
            />
            { selectedFightSummary?.fight?.fightQuickTitle &&
                <>
                    <ColumnHeading  
                        label={selectedFightSummary.fight.fightQuickTitle}
                        size="2xl"
                        />
                    
                    <FightMetadata 
                        selectedFightSummary={props.selectedFightSummary}
                        />
                </>
            }
            { leaders && Array.isArray(leaders) &&
                <LeaderBoard 
                    leaders={leaders && Array.isArray(leaders) ? leaders : []}
                />
            }
        </Flex>
    )
}

const FightMetadata = ({ 
    selectedFightSummary 
}) => {
    const getFightDisposition = selectedFightSummary => {
        const { fight, fighters } = selectedFightSummary;
        if(fight.fightStatus === 'CANCELED') return `Canceled`;
        if(fight.fightStatus === 'PENDING') return `Upcoming`;
        if(fight.fightStatus === 'COMPLETE'){
            if(fight.officialResult.slice(37) === `DR`) return `Draw`;
            if(fight.officialResult.slice(37) === `SD`) return `Split Decision`;
            const winner = fight.officialResult[fighters[0].fighterId] ? fighters[0].lastName : fighters[0].lastName;
            return `${capFirstLetters(winner)} ${fight.officialResult.slice(37)}`
        }
    }

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

    return (
        <Flex
            flexDirection="column"
            p="2"
            w="100%"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            { selectedFightSummaryMetadata.map( (data, _i) => {
                return (  
                    <Flex
                        display="inline-flex"
                    >
                        <Heading 
                            p="1"
                            as="h4" 
                            size="sm"
                            textAlign="left"
                            color="#dadada"
                            // textDecoration="underline"
                        >
                            {`${data.label}`}&#58; 
                        </Heading>
                        <Heading 
                            p="1"
                            as="h4" 
                            size="sm"
                            textAlign="left"
                            color="#c6c8c8"
                        >
                            {data.data}
                        </Heading>
                    </Flex>  
                )
            })}
        </Flex>
    )
}

export const ScorecardsColumn = () => {
    const { 
        selectedFightSummary
    } = useScorecardStore()

    return (
        <Flex
            w="100%"
            p="2"
            bg="inherit"
            id="leaderboard_column"
            flex="1 0 20%"
            flexDir="column"
            minH="30vh"
            alignItems="center"
        >
            <Column
                selectedFightSummary={selectedFightSummary}
            />
            <Column
                leaders={leaders}
            />
        </Flex>
    )
}

const LeaderBoard = ({ leaders }) => {
    return (
        <Flex
            id="scorecards_leaderboard"
            flexDir="column"
            w="100%"
            bg="inherit"
            px="2"
        >
            { leaders.length > 0 && leaders.map( (leader, _i) => {
                return (
                    <Flex
                        key={leader.displayName}
                        flexDir="row"
                        alignItems="center"
                        justifyContent="space-between"
                        w="100%"
                        bg="#171717"
                        p="2"
                        mb="1"
                        minH="3rem"
                        borderRadius="md"
                        display="inline-flex"
                        border="1px solid #353535"
                    >
                        <Heading 
                            color="#cacaca"
                            as="h4" 
                            size="sm"
                        >
                            {`${_i+1}. ${leader.displayName} `}
                        </Heading>
                        <Heading 
                            as="h4" 
                            size="sm"
                            color="#cacaca"
                        >
                            {`${leader.score}`}
                        </Heading>
                    </Flex>
                )
            })}
        </Flex>
    )
}

