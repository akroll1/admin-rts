
import { Flex } from '@chakra-ui/react'
import { FaMapMarkerAlt, FaRegClock, FaTrophy, FaTv } from 'react-icons/fa'
import { BiChevronRightCircle } from 'react-icons/bi'
import { parseEpoch, transformedWeightclass } from '../../utils'
import { IoScaleOutline } from 'react-icons/io5'
import { ShowsNavItem } from './shows-nav-item'
import { GiMoneyStack } from 'react-icons/gi'
import { VscWand } from 'react-icons/vsc'

export const ShowsParticulars = ({
    selectedFightSummary
}) => {
    const { isTitleFight, rounds, weightclass } = selectedFightSummary?.fight ? selectedFightSummary.fight : '';
    const { location, network, showTime } = selectedFightSummary?.show ? selectedFightSummary.show : '';
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
                    <ShowsNavItem icon={<GiMoneyStack />} color="fsl-text" label={`Moneyline`} />
                    <ShowsNavItem icon={<VscWand />} color="fsl-text" label={ `FSL Prediction` } />
                    {/* <ShowsNavItem icon={<FaTrophy />} color="fsl-text" label={ `FSL Prediction`} /> */}
                    <ShowsNavItem label={ ``} />
                </Flex>
            </Flex>
        </Flex>
    )
}