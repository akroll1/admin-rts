import {
    Button,
    Heading,
    Flex,
    Text,
} from '@chakra-ui/react'
import { signinResets } from './resets'

export const FormHeading = ({
    headingLabel,
    label,
    buttonLabel,
    setFormState,
    renderForm,
}) => { 

    return (
        <>
            <Heading 
                textAlign="center" 
                size="xl" 
                fontWeight="extrabold"
            >
                {headingLabel}
            </Heading>
            <Flex 
                flexDir="row"
                m="auto"
                w="100%"
                justifyContent="center"
                alignItems="center"
                mb="6"
            >
                <Text color="#cacaca">{label}</Text>
                <Button 
                    onClick={() => setFormState({ ...signinResets, [renderForm]: true })} 
                    variant="link"  
                    ml="2" 
                    color="blue.300"
                    textDecor="underline"
                    _hover={{
                        color: 'blue.400',
                    }}
                >
                    {buttonLabel}
                </Button>
            </Flex>
        </>
    )
}