import { useEffect, useState } from 'react'
import { 
  Avatar, 
  Box, 
  Button, 
  Checkbox, 
  FormControl, 
  FormHelperText, 
  FormLabel, 
  Heading, 
  HStack, 
  Input, 
  Stack, 
  StackDivider, 
  Text, 
  Textarea, 
  useColorModeValue as mode, 
  VStack 
} from '@chakra-ui/react'
import { HiCloudUpload } from 'react-icons/hi'
import { LanguageSelect, FieldGroup } from '../../chakra'
import { useGlobalStore } from '../../stores'

export const MyAccountForm = () => {

  const { 
    fetchUserAccount,
    updateUser,
    user,
    userAccount,
  } = useGlobalStore()

  const [form, setForm] = useState({
    bio: '',
    email: '',
    fightCoins: '',
    firstName: '',
    isPublic: false,
    lastName: '',
  })

  useEffect(() => {
    fetchUserAccount()
  },[])
  
  useEffect(() => {
    if(userAccount?.lastName){
      setForm({
        ...form,
        bio: userAccount.bio,
        email: user.email,
        fightCoins: userAccount.fightCoins,
        firstName: userAccount.firstName,
        lastName: userAccount.lastName,
        isPublic: userAccount.isPublic,
        sub: user.sub,
        username: user.username
      })

    }
  },[userAccount])

  const handleFormInput = e => {
    const {id, value} = e.currentTarget;
    setForm({...form, [id]: value})
  }

  const handleCheckbox = () => {
    setForm({ ...form, isPublic: !isPublic });
  };

  const handleUpdateUser = () => {
    const options = {
      bio: form.bio,
      firstName: form.firstName,
      lastName: form.lastName,
      isPublic: form.isPublic,
    }
    updateUser(options)
  }

  const { bio, email, fightCoins, firstName, isPublic, lastName, username } = form;

  return (
    <Box px={{ base: '4', md: '10' }} py="8" maxWidth="3xl" mx="auto">
      <form id="account_settings_form" onSubmit={e => e.preventDefault()}>
        <Stack spacing="2" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Account Settings
          </Heading>
          <FieldGroup title="FightCoins">
            <FormControl id="fightCoins">
              <FormLabel>Total</FormLabel>
              <Input w={["40%","25%"]} readOnly type="number" value={fightCoins} />
            </FormControl>
          </FieldGroup>
          <FieldGroup title="Personal Info">
            <VStack width="full" spacing="6">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input readOnly type="email" value={email} />
              </FormControl>

              <FormControl id="username">
                <FormLabel>User Name</FormLabel>
                <Input readOnly type="text" maxLength={255} value={username} />
              </FormControl>

              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input onChange={handleFormInput} type="text" maxLength={255} value={firstName} />
              </FormControl>
              
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input onChange={handleFormInput} type="text" maxLength={255} value={lastName} />
              </FormControl>
  
              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea value={bio} onChange={handleFormInput} rows={5} />
                <FormHelperText>
                  Brief description for your profile. URLs are hyperlinked.
                </FormHelperText>
              </FormControl>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Public Profile">
            <Stack width="full" spacing="4">
              <Checkbox 
                defaultChecked
                isChecked={isPublic} 
                id="isPublic" 
                onChange={handleCheckbox}
              >
                Allow your account to be public.
              </Checkbox>
            </Stack>
          </FieldGroup>
          <FieldGroup title="Language">
            <VStack width="full" spacing="6">
              <LanguageSelect />
            </VStack>
          </FieldGroup>

          <FieldGroup title="Profile Image">
            <Stack 
              direction={["column", "row"]}
              spacing="6" 
              align="center" 
              width="full"
            >
              <Avatar
                size={["lg", "xl"]}
              />
              <Box>
                <HStack spacing="2">
                  <Button 
                    size="sm" 
                    leftIcon={<HiCloudUpload />}
                  >
                    Change photo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    colorScheme="solid"
                  >
                    Delete
                  </Button>
                </HStack>
                <Text fontSize="sm" mt="3" color={mode('gray.500', 'whiteAlpha.600')}>
                  .jpg, .gif, or .png. Max file size 700K.
                </Text>
              </Box>
            </Stack>
          </FieldGroup>
        </Stack>
        <FieldGroup mt="2">
          <HStack width="full">
            <Button 
              onClick={handleUpdateUser} 
              type="submit" 
              colorScheme="solid"
            >
              Save Changes
            </Button>
            <Button 
              variant="outline"
            >
              Cancel
            </Button>
          </HStack>
        </FieldGroup>
      </form>
    </Box>
  )
}
