import React, {useState, useEffect, useInsertionEffect} from 'react'
import { Box, Divider, Flex, Link, Spacer, Stack } from '@chakra-ui/react'
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
import { useScorecardStore } from '../stores'

const Dashboard = props => {
  const { type, showId } = useParams();
  const { 
    setUser, 
    user, 
  } = useScorecardStore()

  const [active, setActive] = useState(type.toUpperCase());
  const [form, setForm] = useState(type.toUpperCase());
  const [formLinks, setFormLinks] = useState([
    { value: "POUND", label:"My P4P List", type: 'P4P-List', icon: FaListOl, link: '/dashboard/pound-list' },
    { value: "ACCOUNT", label:"Account Settings", type: 'User', icon: SettingsIcon, link: '/dashboard/account' },
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
          key={i}
          link={link} 
          id={value} 
          onClick={handleFormSelect} 
          label={label} 
          icon={icon} 
          active={active === value ? true : false} 
        />)
    })
  }
  return (
    <Flex 
      height="auto" 
      width={{ base: 'full'}} 
      direction="row" 
      color="white" 
      flexWrap="wrap" 
      px={6} 
      py={8}
    >
      <ExpiredTokenModal />
      <Box flex="1 0 25%">
        <Stack spacing={6}>
          <Box fontSize="sm" lineHeight="tall">
            <Link  
              as="button" 
              to="/dashboard/account" 
              p="4"
              w="100%" 
              transition="background 0.1s" 
              rounded="xl" 
              _hover={{ bg: 'whiteAlpha.200' }} 
              whiteSpace="nowrap"
              textAlign="left"
            >
              <UserInfo 
                setForm={setForm} 
                setActive={setActive} 
                name={user?.username ? user.username : ''} 
                email={user?.email ? user.email : ''} 
              />
            </Link>
          </Box>
        </Stack>
        <Divider borderColor="whiteAlpha.400" />
        <Stack spacing={6} mt={6}>
          <Stack>
            {userFormLinks()}
          </Stack>
          <Divider borderColor="whiteAlpha.400" />
          <Stack>
            <NavLinkDashboard   
              link="#" 
              label="Notifications" 
              icon={FaRegBell} 
            />
            <NavLinkDashboard 
              link="#" 
              label="Help Center" 
              icon={FaRegQuestionCircle} 
            />
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
        { form === 'POUND' && <MyPoundList /> }
        { form === 'ACCOUNT' && <MyAccountForm /> }
        { form === 'PANELS_MEMBER' && <MyPanelsForm /> }
        { form === 'PANELIST' && <PanelistForm /> }
        { form === 'CREATE_PANEL' && <CreatePanelForm /> }
        { form === 'CREATE-SCORECARD' && <CreateGroupScorecard /> }
        { form === 'POUNDFORM' && <PoundForm /> }
        { form === 'SHOW-FORM' && <ShowForm /> }
        { form === 'FIGHTERS' && <FightersForm /> }
        { form === 'FIGHT-RESOLUTION' && <FightResolutionForm /> }
        { form === 'DISCUSSIONS' && <DiscussionsForm /> }
        { form === 'GUEST-JUDGES' && <GuestJudgeForm /> }
        { form === 'BROADCAST' && <BroadcastForm /> }
        { form === 'FIGHT-FORM' && <FightForm /> }
      </Box>
    </Flex>
  )
}
export default Dashboard