import React, {useState, useEffect, useInsertionEffect} from 'react'
import { Box, Divider, Flex, Spacer, Stack } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { FaListOl, FaEdit, FaRegBell, FaRegChartBar, FaRegQuestionCircle, FaUser, FaUserFriends } from 'react-icons/fa'
import { NavLinkDashboard } from '../components/navbar'
import { UserInfo } from '../chakra'
import { CreateGroupScorecard } from './create-scorecard'
import { 
  MyAccountForm, 
  BroadcastForm, 
  CreatePanelForm,
  DiscussionsForm, 
  FightForm, 
  FightersForm, 
  FightResolutionForm,
  GuestJudgeForm, 
  PanelistForm,
  MyPanelsForm,
  PoundForm, 
  ShowForm 
} from '../components/forms'
import { MyPoundList } from '../components/lists'
import { useParams } from 'react-router-dom'
import { ExpiredTokenModal } from '../components/modals'
import { useStateStore } from '../stores'

const Dashboard = props => {
  const { type, showId } = useParams();
  const [modals, setModals] = useState({
    expiredTokenModal: false
  });
  const { user, setUser, setUserScorecards, tokenConfig, userScorecards } = useStateStore( state => state);
  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase());
  const [formLinks, setFormLinks] = useState([
    // { value: "SCORECARDS", label:"Scorecards", type: 'Scorecard', icon: FaEdit, link: '/dashboard/scorecards' },
    { value: "POUND", label:"My P4P List", type: 'P4P-List', icon: FaListOl, link: '/dashboard/pound-list' },
    { value: "ACCOUNT", label:"Account Settings", type: 'User', icon: SettingsIcon, link: '/dashboard/account' },
    // { value: "CREATE-SCORECARD", label:"Create Scorecard", type: 'Create-Scorecard', icon: FaRegBell, link: '/dashboard/create-scorecard' },
    // { value: "UPCOMING-FIGHTS", label:"My Fight Schedule", type: 'Fight-Schedule', icon: FaRegChartBar, link: '/dashboard/schedule' },
  ]);

  useEffect(() => {
    const setAuth = () => {
      const isSuperAdmin = user.groups.some( group => group.includes('rts-admins'));
      const isPanelist = user.groups.some( group => group.includes('panelist'));
      if(isSuperAdmin && isPanelist){
        setUser({ ...user, isSuperAdmin, isPanelist })
        setFormLinks([...formLinks, ...panelistOptions, ...isSuperAdminFormOptions]);
        return;
      } else if(isPanelist){
        setUser({ ...user, isPanelist })
        setFormLinks([...formLinks, ...panelistOptions]);
      } else if(isSuperAdmin){
        setUser({ ...user, isSuperAdmin })
        setFormLinks([...formLinks, ...isSuperAdminFormOptions]);
      }
    }
    setAuth()
  },[])

  const handleFormSelect = e => {
    setForm(e.currentTarget.id);
    setActive(e.currentTarget.id);
  };
  const panelistOptions = [
    { value: "PANELS_MEMBER", label:"Panel Member", type: 'User', icon: FaUserFriends, link: '/dashboard/panels' },
  ];
  const isSuperAdminFormOptions = [
    { value: "BROADCAST", label:"Broadcast Form", type: 'Broadcast', icon: FaEdit, link: '/dashboard/broadcast' },
    { value: "CREATE_PANEL", label:"Create Panel Form", type: 'Create Panel', icon: FaEdit, link: '/dashboard/create-panel' },
    { value: "DISCUSSIONS", label:"Discussions Form", type: 'Discussions', icon: FaEdit, link: '/dashboard/discussions' },
    { value: "FIGHT-FORM", label:"Fight Form", type: 'Fights', icon: FaEdit, link: '/dashboard/fight-form' },
    { value: "FIGHTERS", label:"Fighters Form", type: 'Fighters', icon: FaEdit, link: '/dashboard/fighters' },
    { value: "FIGHT-RESOLUTION", label:"Fight Resolution Form", type: 'Resolution', icon: FaEdit, link: '/dashboard/fight-resolution' },
    { value: "GUEST-JUDGES", label:"Guest Judges Form", type: 'Guest Judges', icon: FaEdit, link: '/dashboard/guest-judges' },
    { value: "PANELIST", label:"Panelist Form", type: 'User', icon: FaUser, link: '/dashboard/panelist' },
    { value: "POUNDFORM", label:"P4P Form", type: 'P4P Form', icon: FaEdit, link: '/dashboard/pound-form' },
    { value: "SHOW-FORM", label:"Show Form", type: 'Show Form', icon: FaEdit, link: '/dashboard/show-form' },
  ];

  const userFormLinks = () => {
    return formLinks.map((option,i) => {
      const { value, label, icon, link } = option;
      return (
        <NavLinkDashboard   
          subtle={true} 
          link={link} 
          id={value} 
          key={value} 
          onClick={handleFormSelect} 
          label={label} 
          icon={icon} 
          isActive={active === value ? true : false} 
        />)
    })
  }
  return (
    <Flex height="auto" width={{ base: 'full'}} direction="row" color="white" flexWrap="wrap" px={6} py={8}>
      <ExpiredTokenModal 
        modals={modals}
        setModals={setModals}
      />
      <Box flex="1 0 25%">
        <Stack spacing={6}>
          <Box fontSize="sm" lineHeight="tall">
            <Box as="a" href="#" p="3" display="block" transition="background 0.1s" rounded="xl" _hover={{ bg: 'whiteAlpha.200' }} whiteSpace="nowrap">
              <UserInfo setForm={setForm} setActive={setActive} name={user?.username ? user.username : ''} email={user?.email ? user.email : ''} />
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
      <Box 
        overflow='scroll' 
        flex="1 0 75%" 
        spacing={8} 
        mb={8} 
        bg="blackAlpha.500" 
        borderRadius="md" 
        mt={0}
      >
        {/* { form === 'SCORECARDS' && <MyScorecards scorecards={scorecards} user={user} /> } */}
        { form === 'POUND' && <MyPoundList tokenConfig={tokenConfig} user={user} /> }
        { form === 'ACCOUNT' && <MyAccountForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'PANELS_MEMBER' && <MyPanelsForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'PANELIST' && <PanelistForm setModals={setModals} tokenConfig={tokenConfig} user={user} /> }
        { form === 'CREATE_PANEL' && <CreatePanelForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'CREATE-SCORECARD' && <CreateGroupScorecard showId={showId ? showId : ''} tokenConfig={tokenConfig} /> }
        { form === 'POUNDFORM' && <PoundForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'SHOW-FORM' && <ShowForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'FIGHTERS' && <FightersForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'FIGHT-RESOLUTION' && <FightResolutionForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'DISCUSSIONS' && <DiscussionsForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'GUEST-JUDGES' && <GuestJudgeForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'BROADCAST' && <BroadcastForm tokenConfig={tokenConfig} user={user} /> }
        { form === 'FIGHT-FORM' && <FightForm tokenConfig={tokenConfig} user={user} /> }
      </Box>
    </Flex>
  )
}
export default Dashboard