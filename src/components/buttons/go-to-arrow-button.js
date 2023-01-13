import {
    Box, 
    Button,
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { useGlobalStore } from '../../stores';

export const GoToArrowButton = ({
    label,
    navigateTo,
    ...rest
}) => {
    
    const navigate = useNavigate();

    const {
        isSubmitting,
        isSubmittingForm,
    } = useGlobalStore()

    return (
        <Button
            {...rest}
            id="arrow_btn"
            onClick={() => navigate(navigateTo)}
            // disabled={isSubmitting || isSubmittingForm}
            className="group"
            mt={["4"]}
            size={["lg", "lg"]}
            px="8"
            fontSize="1.1rem !important"
            fontWeight="bold"
            // bg="brand.100"
            iconSpacing="3"
            colorScheme="solid"
            rightIcon={
                <Box
                    as={FaArrowRight}
                    fontSize="1.1rem"
                    transition="transform 0.2s"
                    _groupHover={{ transform: 'translateX(2px)' }}
                />
            }
        >
            {`${label}`}
        </Button>
    )
}