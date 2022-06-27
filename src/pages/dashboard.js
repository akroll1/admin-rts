import React, {useState, useEffect, useInsertionEffect} from 'react'
import { Box, Divider, Flex, Spacer, Stack } from '@chakra-ui/react'
import { FaListOl, FaEdit, FaRegBell, FaRegChartBar, FaRegQuestionCircle, FaUser } from 'react-icons/fa'
import { NavLinkDashboard } from '../components/navbar'
import { UserInfo } from '../chakra'
import { MyScorecards } from './my-scorecards'
import { CreateGroupScorecard } from './create-scorecard'
import { AccountSettingsForm, BroadcastForm, DiscussionsForm, FightForm, FightersForm, GuestScorerForm, PoundForm, ShowForm } from '../components/forms'
import { DashboardPoundList } from '../components/lists'
import { useParams } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import { useUserStore } from '../stores'
import jwt_decode from 'jwt-decode'

const Dashboard = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, showId } = useParams();
  const setUser = useUserStore( user => user.setUser);
  const user = useUserStore( store => store);
  const { email, sub, username } = user;
  const localStorageString = `CognitoIdentityServiceProvider.${process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID}.${username}`;
  const accessToken = localStorage.getItem(`${localStorageString}.accessToken`);
  const accessTokenConfig = {
      headers: { Authorization: `Bearer ${accessToken}` }
  };        

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
    const setAuth = async () => {
      const token = accessToken;
      const decodedToken = await jwt_decode(token);
      if(decodedToken['cognito:groups']){
        const isSuperAdmin = decodedToken['cognito:groups'][0] === 'rts-admins';
        if(isSuperAdmin){
          setIsSuperAdmin(true);
          setFormLinks([...formLinks, ...isSuperAdminFormOptions]);
        }
      }
    }
    setAuth()
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
    { value: "BROADCAST", label:"Broadcast Form", type: 'Broadcast', icon: FaEdit, link: '/dashboard/broadcast' },
    { value: "FIGHT-FORM", label:"Fight Form", type: 'Fights', icon: FaEdit, link: '/dashboard/fight-form' },
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
              <UserInfo setForm={setForm} setActive={setActive} name={username} email={email} />
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
        { form === 'SCORECARDS' && <MyScorecards accessTokenConfig={accessTokenConfig} handleFormSelect={handleFormSelect} /> }
        { form === 'CREATE-SCORECARD' && <CreateGroupScorecard showId={showId ? showId : ''} accessTokenConfig={accessTokenConfig} user={user?.sub ? user : null} /> }
        { form === 'POUND' && <DashboardPoundList accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'USER' && <AccountSettingsForm accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'POUNDFORM' && <PoundForm accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'SHOW-FORM' && <ShowForm accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'FIGHTERS' && <FightersForm accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'DISCUSSIONS' && <DiscussionsForm accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'GUEST-SCORERS' && <GuestScorerForm accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'BROADCAST' && <BroadcastForm accessTokenConfig={accessTokenConfig} user={user} /> }
        { form === 'FIGHT-FORM' && <FightForm accessTokenConfig={accessTokenConfig} user={user} /> }
      </Box>
    </Flex>
  )
}
export default Dashboard