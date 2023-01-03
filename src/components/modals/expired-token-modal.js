import { useNavigate } from 'react-router-dom'
import { 
  Button, 
  Heading, 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  Text, 
  useDisclosure 
} from '@chakra-ui/react'
import { ModalsEnum, useGlobalStore } from '../../stores'

export const ExpiredTokenModal = () => {
  
  const { 
    modals,
    setModals,
  } = useGlobalStore()

  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const signin = () => {
    setModals(ModalsEnum.EXPIRED_TOKEN_MODAL, false)
    navigate('/signin')
  }
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={modals[ModalsEnum.EXPIRED_TOKEN_MODAL]}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent p="0.5rem">
        <ModalHeader mb="-1rem" fontSize="sm">FightSync.live</ModalHeader>
        <ModalBody>
            <Heading textAlign="center">Session Expired</Heading>
            <Text textAlign="center">Please sign in again.</Text>
        </ModalBody>
        <ModalFooter display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Button w="50%" onClick={signin} colorScheme="solid" mr={3}>
            Sign In 
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}