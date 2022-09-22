import React from 'react'
import { Box, Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export const ProfileButton = ({ isLoggedIn }) => {

    const navigate = useNavigate();

    return (
        <Box w="full">
            <Menu>
                <MenuButton 
                    mt="4"
                    w='full'
                    size='sm'
                    as={Button} 
                    colorScheme='blue'
                    >
                    Profile
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => navigate('/scorecards')}>Scorecards</MenuItem>
                    <MenuItem onClick={() => navigate('/dashboard/account')}>Profile</MenuItem>
                    {/* <MenuItem onClick={() => navigate('#')}>FAQ</MenuItem> */}
                    <MenuDivider />
                    <MenuItem onClick={() => navigate('/signin')}>{isLoggedIn ? `Sign Out` : `Sign In`}</MenuItem>
                </MenuList>
            </Menu>
        </Box>
    )
}