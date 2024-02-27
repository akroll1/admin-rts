import { 
    Button, 
    Modal, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    useDisclosure 
  } from '@chakra-ui/react'
  import { 
    ModalsEnum,
    useGlobalStore, 
  } from '../../stores'
  
  export const SignInModal = () => {
    
    const { 
      initiateHostedSignIn,
      modals,
      setModals,
    } = useGlobalStore()
  
    const { onClose } = useDisclosure()
    
    const handleSignin = () => {
      sessionStorage.setItem('referrerPath', `${window.location.pathname}${window.location.search || ""}`)
    //   initiateHostedSignIn();
      setModals(ModalsEnum.SIGN_IN_MODAL, false);
    }
  
    return (
      <Modal
        onClose={onClose}
        isOpen={modals[ModalsEnum.SIGN_IN_MODAL]}
        motionPreset="slideInBottom"
        blockScrollOnMount={true}
        closeOnOverlayClick={false}
      >
        <ModalOverlay 
          bg='blackAlpha.300'
          backdropFilter='blur(5px)'
        />
        <ModalContent p="0.5rem" mt="7rem">
          <ModalHeader mb="-1rem" fontSize="md">FightSync.live</ModalHeader>
         
          <ModalFooter 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center"
          >
            <Button 
              onClick={handleSignin} colorScheme="solid" 
              w="50%" 
              my="4"
              mr={3}
            >
              Sign In 
            </Button>
  
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }