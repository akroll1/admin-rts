import React,{useState, useEffect} from 'react'
import { Box, Flex, Stack, useColorModeValue as mode } from '@chakra-ui/react'
import { BiChevronRightCircle } from 'react-icons/bi'
import { NavGroup, NavItem, SearchField } from './fighters-sidebar-components'
import { capFirstLetters } from '../../utils/utils'

export const FightersSidebar = ({ 
    fighters, 
    handleSidebarFighterSelect 
}) => {
    const [searchedFighters, setSearchedFighters] = useState(fighters);
    const handleSearch = e => {
        const { value } = e.currentTarget;
        const regex = /^[a-z]+$/i;
        if(regex.test(value)){
            const searchedFighters = fighters.filter(fighter => {
                return fighter.firstName.toLowerCase().includes(value.toLowerCase()) || fighter.lastName.toLowerCase().includes(value.toLowerCase()) || fighter.ringname.toLowerCase().includes(value.toLowerCase());
            })
            setSearchedFighters(searchedFighters)
        }
    }
    useEffect(() => {
        setSearchedFighters(fighters)
    },[fighters]);

    return (
        <Box w={{base: '100%'}} overflow="scroll" position="relative">
            <Flex borderRadius="5px" flexDir="column" bg="gray.900" color="white" fontSize="sm" w="100%"  id="scoring-sidebar" alignItems="flex-start" justifyContent="flex-start">
                <SearchField w="100%" handleSearch={handleSearch} />
                <Stack w="100%" spacing="8" flex="1" overflow="auto" pt="8" height="auto" maxHeight="50vh">
                    <NavGroup label="Fighters">
                        {
                            searchedFighters?.length > 0 && searchedFighters.map( (fighter,i) => {
                                const { fighterId, firstName, lastName, ringName } = fighter;
                                return <NavItem key={fighterId} fighterId={fighterId} handleSidebarFighterSelect={handleSidebarFighterSelect} icon={<BiChevronRightCircle />} label={`${capFirstLetters(firstName)}  ${capFirstLetters(lastName)}`} />

                            })
                        }
                    </NavGroup>
                </Stack>
            </Flex>
        </Box>
    )
}