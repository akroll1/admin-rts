import React from 'react'
import { Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { stateStore } from '../../stores'
// get isLoggedIn from state store, not handling it in prod.
export const ProfileButton = ({ 
    isLoggedIn,
    setIsLoggedIn 
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const { reset } = stateStore.getState();
        if(isLoggedIn){
            setIsLoggedIn(false)
            reset();
            navigate('/');
        } else {
            setIsLoggedIn(false)
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