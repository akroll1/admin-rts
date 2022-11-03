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
import { useScorecardStore } from '../../stores'

export const ChangeDisplayNameModal = () => {
  const { 
    modals,
    patchDisplayName,
    setModals
  } = useScorecardStore()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Modal
        isCentered
        onClose={() => setModals('changeDisplayName', false)}
        isOpen={modals.changeDisplayName}
        motionPreset="slideInBottom"
    >
        <ModalOverlay />
        <ModalContent p="0.5rem">
            <ModalHeader 
                mb="-1rem" 
                fontSize="sm"
            >
                Change Your Display Name
            </ModalHeader>
            <ModalBody>
                <Heading textAlign="center">Update Display Name</Heading>
                <Text textAlign="center">Would you like to update your display name?</Text>
            </ModalBody>
            <ModalFooter 
                display="flex" 
                flexDirection="row" 
                alignItems="center" 
                justifyContent="center"
            >
            <Button w="50%" onClick={patchDisplayName} colorScheme="solid" mr={3}>
                Set Season Display Name
            </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  )
}