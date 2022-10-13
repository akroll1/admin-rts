
import { useEffect, useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { FaMapMarkerAlt, FaRegClock, FaTrophy, FaTv } from 'react-icons/fa'
import { BiChevronRightCircle } from 'react-icons/bi'
import { capFirstLetters, parseEpoch, transformedWeightclass } from '../../utils'
import { IoScaleOutline } from 'react-icons/io5'
import { ShowsNavItem } from './shows-nav-item'
import { useScorecardStore } from '../../stores'
import { useBoundStore } from '../../stores/useBoundStore'

export const ShowsParticulars = () => {
    const { 
        fightSummary
    } = useScorecardStore()

    const {
        guestJudgeScorecards
    } = useBoundStore()
    // console.log('guestJudgeScorecards: ', guestJudgeScorecards)
    // console.log('fightSummary: ', fightSummary)
    const { isTitleFight, rounds, weightclass } = fightSummary?.fight ? fightSummary.fight : '';
    const { location, network, showTime } = fightSummary?.show ? fightSummary.show : '';
    return (
        <Flex 
            as="section"
            alignItems="baseline"
            justifyContent="baseline"
            flexDir="column" 
            px={['2', '4', '8']} 
            mb="2"
            w="100%"
            pl={["2", "8", "12"]}
            mt="2"
        >
            <Flex
                flexDir={["column", "row"]}
                w="100%"
            >   
                <Flex
                    flexDir="column"
                    flex="1 0 40%"
                    maxW={["100%", "70%", "40%"]}
                >
                    <ShowsNavItem icon={<FaTv />} label={ network } />
                    <ShowsNavItem icon={<FaMapMarkerAlt />} label={ location } />
                    <ShowsNavItem icon={<FaRegClock />} label={ parseEpoch(showTime) } />
                </Flex>
                <Flex
                    flexDir="column"
                    flex="1 0 40%"
                    maxW={["100%", "70%", "40%"]}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <ShowsNavItem icon={<BiChevronRightCircle />} label={ rounds ? rounds + ' Rounds' : '' } />
                    <ShowsNavItem icon={<IoScaleOutline />} color="fsl-text" label={ transformedWeightclass(weightclass) } />
                    <ShowsNavItem icon={<FaTrophy />} color="fsl-text" label={ `Title: ${isTitleFight ? `Yes` : `No`}`} />
                </Flex>
            </Flex>
        </Flex>
    )
}