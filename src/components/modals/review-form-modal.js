import { 
    Modal, 
    ModalBody, 
    ModalCloseButton, 
    ModalContent, 
    Stack 
} from '@chakra-ui/react'
import { useGlobalStore } from '../../stores'
import { FightReviewForm } from '../forms'

export const ReviewFormModal = () => {

    const {
        modals, 
        setModals,
    } = useGlobalStore()
    
    const closeModal = () => {
        setModals('fightReviewFormModal', false)
    }
    return (
        <Modal
            closeOnOverlayClick={true}
            isOpen={modals.fightReviewFormModal}
            onClose={() => console.log('closed')}
            size="md"
            isCentered
            blockScrollOnMount={false}
            trapFocus={false}
            motionPreset="slideInBottom"
        >
        <ModalContent borderRadius="xl" mx={{ base: '2.5', lg: '16' }} overflow="scroll">
            <ModalCloseButton
                onClick={closeModal}
                top="0"
                right="0"
                size="lg"
                borderRadius="none"
                borderBottomLeftRadius="md"
            />
            <ModalBody
                px={['5', '8', '12' ]}
                py={['10', '8', '12' ]}
            >
            <Stack spacing="6">
                <FightReviewForm 
                    closeModal={closeModal}
                />
            </Stack>
            </ModalBody>
        </ModalContent>
        </Modal>
    )
}