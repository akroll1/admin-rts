import { useNavigate } from 'react-router-dom';
import {
    Button, 
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { ModalsEnum, useGlobalStore } from '../../stores';

export const SignInModal = () => {

    const navigate = useNavigate()
    const { onClose } = useDisclosure()

    const {
        modals,
        setModals,
    } = useGlobalStore()

    const handleCloseModal = () => {
        sessionStorage.setItem('playFantasyModalViewed', true)
        setModals(ModalsEnum.SIGN_IN_MODAL, false)
    }

    const handleGoToSignin = e => {
        navigate("/signin")
        setModals(ModalsEnum.SIGN_IN_MODAL, false)
    }

    return (
        <Modal 
            id="unauthed_sign_in_modal"
            isOpen={modals[ModalsEnum.SIGN_IN_MODAL]} 
            closeOnOverlayClicks
            onClose={onClose}
            size={['xs', 'md']}
        >
            <ModalOverlay 
                bg='blackAlpha.300'
                backdropFilter='blur(3px)'
            />
            <ModalContent mt="7rem">

                <ModalCloseButton onClick={handleCloseModal} />
                <ModalBody textAlign="center"> 
                    <Heading
                        mt="8"
                        fontSize={["2xl", "3xl"]}
                    >
                        Play Fantasy Boxing
                    </Heading>

                    {/* <PlayFantasyListItems /> */}
                    
                </ModalBody>
                <ModalFooter
                    w="100%"
                    justifyContent="center"
                    alignItems="center"
                    mb="4"
                    display="flex"
                    flexDirection={["column", "row"]}
                    
                >
                    <Button
                        id="request_access"
                        w={["100%", "40%"]}
                        onClick={handleGoToSignin}
                        mb={[2, 0]}
                        mr={[0, 2]}
                        variant="outline"
                    >
                        Request Access
                    </Button>
                    <Button
                        id="sign_in"
                        w={["100%", "40%"]}
                        onClick={handleGoToSignin}
                    >
                        Sign In
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}