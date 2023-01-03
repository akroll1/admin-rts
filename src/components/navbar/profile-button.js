import { useState } from 'react'
import { 
    Flex, 
    Menu, 
    MenuButton, 
    MenuDivider, 
    MenuItem, 
    MenuList 
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import { useGlobalStore } from '../../stores'

export const ProfileButton = ({ 
    onToggle
}) => {
    
    const navigate = useNavigate();
    const {
        user,
        signOut,
    } = useGlobalStore();

    const handleClick = () => {
        if(user.isLoggedIn){
            navigate('/dashboard/account')
            onToggle()
            return
        }
        onToggle()
        navigate('/signin')
    }

    return (
        <Flex 
            m="1rem auto"
            minW="20%"
        >
            <Menu m="auto">
                <MenuButton 
                    id="profile_btn"
                    m="auto"
                    size='md'
                    color="#C8C8C8"
                    _hover={{color: 'white'}}
                    fontSize="1.1rem"
                    fontWeight="600"
                    onClick={handleClick}
                >
                    {user.isLoggedIn ? `Profile` : `Sign In`}
                </MenuButton>
                {/* {!isMobile && isLoggedIn &&
                    <MenuList>
                        <MenuItem value="/scorecards" onClick={handleNavigate}>Scorecards</MenuItem>
                        <MenuItem value="/dashboard/account" onClick={handleNavigate}>Profile</MenuItem>
                        <MenuDivider />
                        <MenuItem onClick={() => handleSignOutClick()}>Sign Out</MenuItem>
                    </MenuList>
                } */}
            </Menu>
        </Flex>
    )
}