import { 
    Skeleton,
    SkeletonText,
    Stack
} from '@chakra-ui/react'

export const ScoringSidebarSkeletons = () => {

    return (
        <Stack
            p="2"
            w="90%"
            borderRadius='md'
        >
            <Stack
                mt="2"
            >
                <Skeleton height='50px' />
                <SkeletonText 
                    p="2"
                    pt="0"
                    maxW="80%"
                    spacing="2"
                    noOfLines={5}
                    skeletonHeight="3"
                />
            </Stack>
            <Stack
                spacing="2"
            >
                <Skeleton height="8" maxW="90%"></Skeleton>
                <Skeleton height="7" maxW="80%"></Skeleton>
                <Skeleton height="7" maxW="70%"></Skeleton>
            </Stack>
               
        </Stack>
    )
}