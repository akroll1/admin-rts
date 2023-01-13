import {
    Box, 
    Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export const ArrowLinkButton = ({
    icon,
    id,
    label,
    mr,
    navigateTo,
}) =>  {

    const navigate = useNavigate();

    return (
        <Button
            mr={mr ? mr : '0'}
            id="arrow_link_button"
            onClick={() => navigate(`${navigateTo}`)}
            className="group"
            size={["xs", "xs"]}
            // fontSize="md"
            fontWeight="bold"
            iconSpacing="3"
            colorScheme="solid"
            variant="link"
            color="gray.300"
            letterSpacing="0.5px"
            _hover={{
                color: '#fff',
                textDecor: "none"
            }}
            _focus={{
                borderColor: 'tranparent'
            }}
            rightIcon={
                <Box
                    as={icon}
                    fontSize="sm"
                    transition="transform 0.2s"
                    _groupHover={id === 'copy' ? {} : { transform: 'translateX(3px)' } }
                />
            }
        >
            {`${label}`}
        </Button>
    )
}