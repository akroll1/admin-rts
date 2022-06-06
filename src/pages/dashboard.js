import React, {useState, useEffect} from 'react'
import { Box, Divider, Flex, Spacer, Stack } from '@chakra-ui/react'
import { FaListOl, FaEdit, FaRegBell, FaRegChartBar, FaRegQuestionCircle, FaUser } from 'react-icons/fa'
import { NavLinkDashboard } from '../components/navbar'
import { UserInfo } from '../chakra'
import jwt_decode from 'jwt-decode'
import { MyScorecards } from './my-scorecards'
import { CreateGroupScorecard } from './create-scorecard'
import { GuestScorerForm, DiscussionsForm, PoundForm, FightersForm, ShowForm, AccountSettingsForm } from '../components/forms'
import { PoundList } from '../components/lists'
import { ExpiredTokenModal } from '../components/modals'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Dashboard = props => {
  const navigate = useNavigate();
  const { type, showId } = useParams();
  const username = sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '';
  let isLoggedIn, idToken, accessToken, decodedAccessToken, decodedIdToken;
  if(username){
      accessToken = username ? localStorage.getItem('CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username + '.accessToken') : null ;
      decodedAccessToken = jwt_decode(accessToken);
      idToken = localStorage.getItem('CognitoIdentityServiceProvider.'+ process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username + '.idToken');
      decodedIdToken = jwt_decode(idToken);
      isLoggedIn = Date.now()/1000 > decodedIdToken.exp ? false : true;
  } else {
      navigate('/signin', { referringPage: '/dashboard/' + type });
  }
  const idTokenConfig = {
    headers: { Authorization: `Bearer ${idToken}` }
  };        
  const accessTokenConfig = {
    headers: { Authorization: `Bearer ${accessToken}` }
  };        
  const tokenIsGood = Date.now() < (decodedIdToken.exp * 1000) ? true : false;
  const [toggleState, setToggleState] = useState(false);
  const [user, setUser] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase());
  const [formLinks, setFormLinks] = useState([
    { value: "SCORECARDS", label:"Scorecards", type: 'Scorecard', icon: FaEdit, link: '/dashboard/scorecards' },
    { value: "POUND", label:"My P4P List", type: 'P4P-List', icon: FaListOl, link: '/dashboard/pound-list' },
    { value: "USER", label:"Account Settings", type: 'User', icon: FaUser, link: '/dashboard/user' },
    // { value: "CREATE-SCORECARD", label:"Create Scorecard", type: 'Create-Scorecard', icon: FaRegBell, link: '/dashboard/create-scorecard' },
    // { value: "UPCOMING-FIGHTS", label:"My Fight Schedule", type: 'Fight-Schedule', icon: FaRegChartBar, link: '/dashboard/schedule' },
  ]);
  useEffect(() => {
    if(tokenIsGood){
      setUser({ ownerDisplayName: decodedAccessToken.username, sub: decodedAccessToken.sub, email: decodedIdToken.email })
      if(decodedAccessToken['cognito:groups'] && decodedAccessToken['cognito:groups'][0] === 'rts-admins'){
        setUser({ isSuperAdmin: true, ownerDisplayName: decodedAccessToken.username, sub: decodedAccessToken.sub, email: decodedIdToken.email })
        setIsSuperAdmin(true);
        setFormLinks( prev => [...prev, ...isSuperAdminFormOptions]);
      } 
    } else {
      navigate('/signin', { referringPage: '/dashboard/' + type });
    }
    setToggleState(!toggleState)
  },[])

  const handleFormSelect = e => {
    setForm(e.currentTarget.id);
    setActive(e.currentTarget.id);
  };

  const isSuperAdminFormOptions = [
    { value: "SHOW-FORM", label:"Show Form", type: 'Show Form', icon: FaEdit, link: '/dashboard/show-form' },
    { value: "POUNDFORM", label:"P4P Form", type: 'P4P Form', icon: FaEdit, link: '/dashboard/pound-form' },
    { value: "FIGHTERS", label:"Fighters Form", type: 'Fighters', icon: FaEdit, link: '/dashboard/fighters' },
    { value: "DISCUSSIONS", label:"Discussions Form", type: 'Discussions', icon: FaEdit, link: '/dashboard/discussions' },
    { value: "GUEST-SCORERS", label:"Guest Scorers Form", type: 'Guest Scorers', icon: FaEdit, link: '/dashboard/guest-scorers' },
  ];

  const userFormLinks = () => {
    return formLinks.map((option,i) => {
      const { value, label, icon, link } = option;
      return (<NavLinkDashboard subtle link={link} id={value} key={value} onClick={e => handleFormSelect(e)} label={label} icon={icon} isActive={active === value ? true : false} />)
    })
  }
  return (
    <Flex height="auto" width={{ base: 'full'}} direction="row" color="white" flexWrap="wrap" px={6} py={8}>
      <Box flex="1 0 25%">
        <Stack spacing={6}>
          <Box fontSize="sm" lineHeight="tall">
            <Box as="a" href="#" p="3" display="block" transition="background 0.1s" rounded="xl" _hover={{ bg: 'whiteAlpha.200' }} whiteSpace="nowrap">
              <UserInfo setForm={setForm} setActive={setActive} name={user && user.displayName ? user.displayName : ''} email={user ? user.email : ''} />
              <ExpiredTokenModal openModal={!tokenIsGood} />
            </Box>
          </Box>
        </Stack>
        <Divider borderColor="whiteAlpha.400" />
        <Stack spacing={6} mt={6}>
          <Stack>
            {userFormLinks()}
          </Stack>
          <Divider borderColor="whiteAlpha.400" />
          <Stack>
            <NavLinkDashboard link="#" label="Notifications" icon={FaRegBell} />
            <NavLinkDashboard link="#" label="Help Center" icon={FaRegQuestionCircle} />
          </Stack>
        <Spacer />
        </Stack>
      </Box>
      <Box overflow='scroll' flex="1 0 75%" spacing={8} mb={8} bg="blackAlpha.500" borderRadius="md" mt={0}>
        { form === 'SCORECARDS' && <MyScorecards toggleState={toggleState} accessTokenConfig={accessTokenConfig} handleFormSelect={handleFormSelect} user={user ? user: ''} /> }
        { form === 'CREATE-SCORECARD' && <CreateGroupScorecard showId={showId ? showId : ''} accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'POUND' && <PoundList accessTokenConfig={accessTokenConfig} user={user ? user: ''} /> }
        { form === 'USER' && <AccountSettingsForm idTokenConfig={idTokenConfig} user={user ? user: ''} /> }
        { form === 'POUNDFORM' && <PoundForm accessTokenConfig={accessTokenConfig} user={user ? user: ''} /> }
        { form === 'SHOW-FORM' && <ShowForm accessTokenConfig={accessTokenConfig} user={user ? user: ''} /> }
        { form === 'FIGHTERS' && <FightersForm accessTokenConfig={accessTokenConfig} user={user ? user: ''} /> }
        { form === 'DISCUSSIONS' && <DiscussionsForm accessTokenConfig={accessTokenConfig} user={user ? user: ''} /> }
        { form === 'GUEST-SCORERS' && <GuestScorerForm accessTokenConfig={accessTokenConfig} user={user ? user: ''} /> }
      </Box>
    </Flex>
  )
}
export default Dashboard