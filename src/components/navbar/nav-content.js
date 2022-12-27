import { 
  Box, 
  Button, 
  Flex, 
  Heading,
  HStack, 
  useDisclosure 
} from '@chakra-ui/react'
import { NavLink } from './nav-link'
import { NavMenu } from './nav-menu'
import { ToggleButton, Submenu } from '../../chakra'
import { links } from './navbar_data'
import { ProfileButton } from './profile-button'
import { useNavigate } from 'react-router'
import { useGlobalStore } from '../../stores'

const MobileNavContext = props => {
  const { isLoggedIn } = useGlobalStore()
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const handleFightSyncButtonClick = value => {
      onToggle()
  }

  return (
    <>
      <Flex 
        zIndex={100000}
        align="center" 
        justify="space-between" 
        className="nav-content__mobile" 
        {...props}
        >
        <Box 
          flexBasis="6rem"
        >
          <ToggleButton 
            isOpen={isOpen} 
            handleFightSyncButtonClick={handleFightSyncButtonClick} 
          />
        </Box>
        <Heading 
          as="h3" 
          size="sm"
          textAlign="center"
          letterSpacing="1px"
          cursor="pointer"
          onClick={() => navigate('/')}
        >
          FightSync
        </Heading>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>
        {links.map( (link, i) => 
          link.children ? (
            <Submenu.Mobile 
              key={i} 
              link={link} 
              onClick={onToggle}
            />
          ) : (
            <NavLink.Mobile 
              key={i} 
              href={link.href}
              onClick={onToggle}
            >
              {link.label}
            </NavLink.Mobile>
          ),
        )}
          <ProfileButton 
            isMobile={true}
            isLoggedIn={isLoggedIn}
            isOpen={isOpen}
            handleFightSyncButtonClick={handleFightSyncButtonClick} 
            onToggle={onToggle}
          />
      </NavMenu>
    </>
  )
}

const DesktopNavContent = props => {

  const { user } = useGlobalStore()
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure(); 
  return (
    <Flex 
      zIndex={1000000}
      className="nav-content__desktop" 
      align="center" 
      justify="space-between" 
      {...props}
    >
      <Button
        minW="20%"
        colorScheme="solid"
        _hover={{ 
          background: 'transparent',
          color: 'white'  
        }} 
        _focus={{ 
          boxShadow: 'none !important',
          color: 'white'
        }}
        color="#c8c8c8" 
        onClick={() => navigate('/')} 
        background="transparent"
        to="/"
      >
        FightSync
      </Button>
      <HStack 
        as="ul" 
        id="nav__primary-menu" 
        aria-label="Main Menu" 
        listStyleType="none"
      >
        {links.map( (link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.children ? (
              <Submenu.Desktop link={link} />
            ) : (
              <NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="200px" justify="space-between">
        <ProfileButton 
          isMobile={false}
          onToggle={onToggle}
        />
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
}