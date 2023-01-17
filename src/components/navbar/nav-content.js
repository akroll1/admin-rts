import { 
  Box, 
  Button, 
  Flex, 
  Heading,
  HStack, 
  useDisclosure 
} from '@chakra-ui/react'
import { DesktopNavLink, MobileNavLink } from './nav-link'
import { NavMenu } from './nav-menu'
import { 
  DesktopSubmenu, 
  MobileSubMenu,
  ToggleButton, 
} from '../../chakra'
import { links } from './navbar_data'
import { ProfileButton } from './profile-button'
import { useNavigate } from 'react-router'
import { useGlobalStore } from '../../stores'

export const MobileNavContext = props => {
  const { user } = useGlobalStore()
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Flex 
        zIndex={100000}
        align="center" 
        justify="space-between" 
        {...props}
        >

        <ToggleButton 
          isOpen={isOpen} 
          onToggle={onToggle}
        />
        <Heading 
          as="h3" 
          size="sm"
          textAlign="center"
          letterSpacing="1px"
          cursor="pointer"
          onClick={() => navigate('/')}
        >
          Admin
        </Heading>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>
        {links.map( (link, i) => 
          link.children ? (
            <MobileSubMenu
              key={i} 
              link={link} 
            />
          ) : (
            <MobileNavLink
              key={i} 
              href={link.href}
              onToggle={onToggle}
            >
              {link.label}
            </MobileNavLink>
          ),
        )}
          <ProfileButton 
            isMobile={true}
            isLoggedIn={user.isLoggedIn}
            isOpen={isOpen}
            onToggle={onToggle}
          />
      </NavMenu>
    </>
  )
}

export const DesktopNavContent = props => {

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
        Admin
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
              <DesktopSubmenu 
                link={link} 
              />
            ) : (
              <DesktopNavLink
                href={link.href}
              >
                {link.label}
              </DesktopNavLink>
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
