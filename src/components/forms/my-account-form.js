import { useEffect, useState } from 'react'
import { 
  Avatar, 
  Box, 
  Button, 
  Checkbox, 
  Flex, 
  FormControl, 
  FormHelperText, 
  FormLabel, 
  Heading, 
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
    isSubmitting,
    updateUserAccount,
    user,
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
    if(user?.sub){
      setForm({
        ...form,
        bio: user.bio,
        email: user?.email || "",
        fightCoins: user?.fightCoins || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        isPublic: user?.isPublic || "",
        sub: user?.sub || "",
        username: user?.username || "",
      })
    }
  },[user])

  const handleFormChange = e => {
    const {id, value} = e.currentTarget;
    if(id === 'isPublic'){
      setForm( prev => ({ ...prev, [id]: !prev.isPublic }))
      return
    }
    setForm({...form, [id]: value})
  }

  const handleUpdateUser = () => {
    const options = {
      bio: form.bio,
      firstName: form.firstName,
      lastName: form.lastName,
      isPublic: form.isPublic,
    }
    updateUserAccount(options)
  }

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
              <Input w={["40%","25%"]} readOnly type="number" value={form?.fightCoins} />
            </FormControl>
          </FieldGroup>
          <FieldGroup title="Personal Info">
            <VStack width="full" spacing="6">
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input readOnly type="email" value={form?.email} />
              </FormControl>

              <FormControl id="username">
                <FormLabel>User Name</FormLabel>
                <Input readOnly type="text" maxLength={255} value={form?.username} />
              </FormControl>

              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input onChange={handleFormChange} type="text" maxLength={255} value={form?.firstName} />
              </FormControl>
              
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input onChange={handleFormChange} type="text" maxLength={255} value={form?.lastName} />
              </FormControl>
  
              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea value={form?.bio} onChange={handleFormChange} rows={5} />
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
                isChecked={form?.isPublic} 
                id="isPublic" 
                onChange={handleFormChange}
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
                <VStack spacing="2">
                  <Button 
                    size="sm" 
                    leftIcon={<HiCloudUpload />}
                    w="75%"
                    disabled
                  >
                    Change photo
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    colorScheme="solid"
                    w="75%"
                    disabled
                  >
                    Delete
                  </Button>
                </VStack>
                <Text fontSize="sm" mt="3" color={mode('gray.500', 'whiteAlpha.600')}>
                  .jpg, .gif, or .png. Max file size 700K.
                </Text>
              </Box>
            </Stack>
          </FieldGroup>
        </Stack>
        <FieldGroup 
          mt="8" 
          title="Save Changes"
        >
        <StackDivider />

            <Flex
              w="100%"
              alignItems="center"
              justifyContent="center"
              flexDir={["column", "row"]}
              m="auto"
              px="auto"
            >
              <Button 
                loadingText='Submitting'
                isLoading={isSubmitting}
                m="auto"
                onClick={handleUpdateUser} 
                type="submit" 
                colorScheme="solid"
                minH="2.5rem"
                w={["100%", "50%", "50%"]}
              >
                Save Changes
              </Button>
            </Flex>
        </FieldGroup>
      </form>
    </Box>
  )
}
