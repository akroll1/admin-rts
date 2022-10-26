import { useState } from 'react'
import { Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { useScorecardStore } from '../../stores'

export const ProfileButton = () => {
    const navigate = useNavigate();
    const {
        reset,
        setUser,
        user
    } = useScorecardStore();
    const { isLoggedIn } = user
    const [open, setOpen] = useState(false)

    const openProfile = () => {
        if(isLoggedIn) return setOpen(true)
        if(!isLoggedIn) navigate('/signin')
    }

    const handleSignOutClick = () => {
        setOpen(false)
        reset()
        navigate('/')
    }

    const handleNavigate = e => {
        setOpen(false)
        const { value } = e.currentTarget
        navigate(value)
    }

    return (
        <Flex 
            m="auto"
            minW="20%"
        >
            <Menu m="auto">
                <MenuButton 
                    m="auto"
                    size='md'
                    color="#C8C8C8"
                    _hover={{color: 'white'}}
                    fontSize="20px"
                    fontWeight="600"
                    onClick={openProfile}
                >
                    {isLoggedIn ? `Profile` : `Sign In`}
                </MenuButton>
                {open &&
                    <MenuList>
                        <MenuItem value="/scorecards" onClick={handleNavigate}>Scorecards</MenuItem>
                        <MenuItem value="/dashboard/account" onClick={handleNavigate}>Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => handleSignOutClick()}>Sign Out</MenuItem>
                    </MenuList>
                }
            </Menu>
        </Flex>
    )
}