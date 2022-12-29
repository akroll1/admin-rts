import { Box, Text } from '@chakra-ui/react'

export const AdminPanel = () => {

    return (
        <Box flexDirection="column" borderRadius="5px" w="50%" bg="gray" m="3" p="6">
            <Text>Admin Panel</Text>
            <Box as="button" borderRadius="md" bg="tomato" color="white" px={4} h={8} w="50%" mt="6">End Fight</Box>
        </Box>
    )
}