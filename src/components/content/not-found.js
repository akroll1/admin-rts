import { 
    Box, 
    Button, 
    Center, 
    Heading, 
} from "@chakra-ui/react"
import { useNavigate } from "react-router"

export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <Box 
            flexDirection="column" 
            px={['4',]} 
            p="4" 
            py="8" 
            mt="8"
            mx="auto" 
            justifyContent="flex-start"
        >
            <Center>
                <Heading 
                    px="4" 
                    mb="8" 
                    as="h1" 
                    size="4xl"
                >
                    404
                </Heading>
            </Center>
            <Center flexDirection="column">
                <Heading 
                    px="4" 
                    mx="auto" 
                    mb="8" 
                    as="h2" 
                    size="2xl"
                >
                    WTF?! This page does not exist.
                </Heading>
                <Heading 
                    mb="4" 
                    as="h3" 
                    size="sm"
                >
                    This might be our fault...
                </Heading>
                <Button 
                    m="auto" 
                    fontSize="48" 
                    mt="1" 
                    px="4" 
                    mb="8" 
                    onClick={() => navigate("/")}
                    variant="link"
                >
                    &#8592;&nbsp; Just take me home!
                </Button>
            </Center>
        </Box>
    )
}
