import {
    Flex,
    Text,
} from '@chakra-ui/react'

export const RenderMessages = ({
    message,
}) => {

    return (
        <Flex 
            px="2" 
            w="100%"
            justifyContent={message?.isSender 
                ? "flex-start"
                : "flex-end"}
        >
                {message?.isSender 
                    ?
                        <IsSenderMessage message={message} />
                    :
                        <Message message={message} />
                }
        </Flex>
    )
}

export const Message = ({
    message,
}) => {
    return (
        <Flex
            w="70%"
            flexDir="column"
            alignItems="flex-end"
        >
            <Text 
                w="100%"
                color={message?.isSender
                    ? "yellow.400"
                    : "gray.400"}
                as="p"
                textAlign="right"
                p="0"
                pl="6"
            >
                {`${message?.username} `}
            </Text>

            <Text 
                as="p" 
                py="2px"
                px="2"
                pr="2"
                background="gray.700"
                borderRadius="md"
            >
                {`${message?.message}`}
            </Text>
        </Flex>
    )
}
export const IsSenderMessage = ({
    message,
}) => {
    return (
        <Flex
            w="70%"
            flexDir="column"
            alignItems="flex-start"
        >
            <Flex>
                <Text 
                    w="100%"
                    textAlign="left"
                    color={message.isSender
                        ? "yellow.400"
                        : "gray.400"}
                    as="p"
                >
                    {`${message?.username} `}
                </Text>
            </Flex>
            <Flex>
                <Text 
                    as="p" 
                    py="2px"
                    px="2"
                    pl="2"
                    background="gray.600"
                    borderRadius="md"
                >
                    {`${message?.message}`}
                </Text>
            </Flex>
        </Flex>
    )
}
