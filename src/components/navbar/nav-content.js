import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Flex, HStack,MenuButton,useDisclosure } from '@chakra-ui/react'
import { NavLink } from './nav-link'
import { NavMenu } from './nav-menu'
import { ToggleButton, Submenu } from '../../chakra'
import { links } from './navbar_data'
import { useNavigate } from 'react-router'
import { ProfileButton } from './profile-button'

const MobileNavContext = props => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const handleButtonClick = () => {
    if(isLoggedIn){
      setIsLoggedIn(false);
      sessionStorage.clear();
      return navigate('/');
    }
    return navigate("/")
  }
  return (
    <>
      <Flex 
        align="center" 
        justify="space-between" 
        className="nav-content__mobile" 
        {...props}
      >
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
      </Flex>
      <NavMenu animate={isOpen ? 'open' : 'closed'}>
        {links.map((link, i) => 
          link.children ? (
            <Submenu.Mobile key={i} link={link} />
          ) : (
            <NavLink.Mobile key={i} href={link.href}>
              {link.label}
            </NavLink.Mobile>
          ),
        )}
          <ProfileButton isLoggedIn={isLoggedIn} />
      </NavMenu>
    </>
  )
}

const DesktopNavContent = props => {
  const { isLoggedIn, setIsLoggedIn } = props;
  const navigate = useNavigate();

  // const message = stateStore.getState().broadcast;
  // const username = stateStore.getState().username;
  // const [broadcast, setBroadcast] = useState('');
  // const [broadcastConnection, setBroadcastConnection] = useState(null);
  // const connectionRef = useRef(broadcastConnection);
  // connectionRef.current = broadcastConnection;


  // useEffect(() => {
  //     const localStorageString = 'CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username;
  //     const accessToken = localStorage.getItem(localStorageString + '.accessToken');
  //     // initConnection(accessToken);
  // },[])
  
  // useEffect(() => {
  //     if(message){
  //         broadcastConnection.send(JSON.stringify({ action: 'routeBroadcast', data: message }));
  //     }
  // },[message]);

  // const initConnection = async (accessToken) => {
  //     const socket = new WebSocket(process.env.REACT_APP_BROADCAST_URL);
  //     setBroadcastConnection(socket);
  
  //     socket.onopen = (event) => {
  //         console.info("Broadcast connected: ", event);
  //     };
  
  //     socket.onclose = (event) => {
  //         initConnection(accessToken);
  //     };
  
  //     socket.onerror = (event) => {
  //         console.error("Broadcast websocket error event:", event);
  //     };
  
  //     socket.onmessage = (event) => {
  //         // console.log('onmessage: ', event)
  //         const update = {
  //             notification: JSON.parse(event.data).data,
  //             displayName: 'FightSync.live'
  //         };
  //         setBroadcast(update);
  //         setTimeout(() => {
  //             setBroadcast('')
  //         },5000)
  //     };
  // };

  // const socketActive = () => {
  //     return broadcastConnection?.readyState === 1;
  // }
  // const handleCloseNotification = e => {
  //     setBroadcast('');
  // };

  // const { notification, displayName } = broadcast ? broadcast : '';
  // console.log('broadcast: ', broadcast)


  // const isLoggedIn = socketActive() ? true : false;

  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <Button onClick={() => navigate('/')} bg="transparent" to="/">FightSync</Button>
      <HStack as="ul" id="nav__primary-menu" aria-label="Main Menu" listStyleType="none">
        {links.map((link, idx) => (
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
        <ProfileButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
}