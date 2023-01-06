
import { useEffect, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { FaMapMarkerAlt, FaRegClock, FaTrophy, FaTv } from 'react-icons/fa'
import { BiChevronRightCircle } from 'react-icons/bi'
import { capFirstLetters, parseEpoch, transformedWeightclass } from '../../utils'
import { IoScaleOutline } from 'react-icons/io5'
import { ShowsNavItem } from './shows-nav-item'
import { GiMoneyStack } from 'react-icons/gi'
import { VscWand } from 'react-icons/vsc'
import { FightPropsEnum, useGlobalStore } from '../../stores'

export const ShowsParticulars = ({
    selectedFightSummary
}) => {

    const { 
        fetchFightProps,
        fightProps
    } = useGlobalStore()

    const [propsLabels, setPropsLabels] = useState({
        moneyline1: '',
        moneyline2: ''
    })
    const { fightId, isTitleFight, rounds, weightclass } = selectedFightSummary?.fight ? selectedFightSummary.fight : '';
    const { location, network, showTime } = selectedFightSummary?.show ? selectedFightSummary.show : '';
    const { fighters } = selectedFightSummary?.fighters?.length === 2 ? selectedFightSummary : [];

    useEffect(() => {
        if(selectedFightSummary?.fight?.fightId){
            fetchFightProps(selectedFightSummary.fight.fightId)
        }
    },[selectedFightSummary])

    useEffect(() => {
        if(fightProps?.fightProps && fightProps?.fightProps[FightPropsEnum.MONEYLINE]){
            const [fighter1, fighter2] = fighters;
            const obj = fightProps.fightProps[FightPropsEnum.MONEYLINE]
            setPropsLabels({
                moneyline1: `${capFirstLetters(fighter1.lastName)}` + '  ' + `${obj[fighter1.fighterId]}`,
                moneyline2: `${capFirstLetters(fighter2.lastName)}`  + '  ' + `${obj[fighter2.fighterId]}`
            })
        }
    },[fightProps, selectedFightSummary])

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
                    flex="1 0 30%"
                    maxW={["100%", "70%", "40%"]}
                >
                    <ShowsNavItem icon={<FaTv />} label={ network } />
                    <ShowsNavItem icon={<FaMapMarkerAlt />} label={ location } />
                    <ShowsNavItem icon={<FaRegClock />} label={ parseEpoch(showTime) } />
                </Flex>
                <Flex
                    flexDir="column"
                    flex="1 0 30%"
                    maxW={["100%", "70%", "40%"]}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <ShowsNavItem icon={<BiChevronRightCircle />} label={ rounds ? rounds + ' Rounds' : '' } />
                    <ShowsNavItem icon={<IoScaleOutline />} color="fsl-text" label={ transformedWeightclass(weightclass) } />
                    <ShowsNavItem icon={<FaTrophy />} color="fsl-text" label={ `${selectedFightSummary?.fight?.fightId ? isTitleFight ? `Title Fight` : `No Belts` : ``}`} />
                </Flex>
                <Flex
                    flexDir="column"
                    flex="1 0 30%"
                    maxW={["100%", "70%", "40%"]}
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <ShowsNavItem icon={<GiMoneyStack />} color="fsl-text" label={propsLabels.moneyline1 ? propsLabels.moneyline1 : `N/A`} />
                    <ShowsNavItem icon={<GiMoneyStack />} color="fsl-text" label={propsLabels.moneyline2 ? propsLabels.moneyline2 : `N/A`} />
                    {/* <ShowsNavItem icon={<VscWand />} color="fsl-text" label={ `FSL Prediction` } /> */}
                    <ShowsNavItem label={ ``} />
                </Flex>
            </Flex>
        </Flex>
    )
}