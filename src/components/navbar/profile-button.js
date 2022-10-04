import React from 'react'
import { Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { useScorecardStore } from '../../stores'

export const ProfileButton = () => {
    const navigate = useNavigate();
    const {
        user
      } = useScorecardStore();
      const { isLoggedIn, setUser } = user;

    const handleClick = () => {
        if(isLoggedIn){
            setUser({ ...user, isLoggedIn: false })
            navigate('/');
        } else {
            setUser({ ...user, isLoggedIn: false })
            navigate('/signin')
        }
    }
    const signin = () => {
        if(isLoggedIn) return
        return navigate('/signin')
    }

    return (
        <Box w="full">
            <Menu>
                <MenuButton 
                    mt="4"
                    w='full'
                    size='sm'
                    as={Button} 
                    colorScheme='blue'
                    onClick={signin}
                >
                    {isLoggedIn ? `Profile` : `Sign In`}
                </MenuButton>
                {isLoggedIn &&
                    <MenuList>
                        <MenuItem onClick={() => navigate('/scorecards')}>Scorecards</MenuItem>
                        <MenuItem onClick={() => navigate('/dashboard/account')}>Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => handleClick()}>{isLoggedIn ? `Sign Out` : `Sign In`}</MenuItem>
                    </MenuList>
                }
            </Menu>
        </Box>
    )
}