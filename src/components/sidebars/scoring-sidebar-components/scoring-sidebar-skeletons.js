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
        >
            <Stack
                mt="2"
            >
                <Skeleton 
                    height='50px' 
                    borderRadius='md'
                />
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
                { [ ...new Array(3).fill('')].map( (el, _i) => (
                    <Skeleton 
                        height="6" 
                        maxW="90" 
                        minW="80%"
                        my="1"
                        borderRadius='md'
                    />
                ))}
            </Stack>
               
        </Stack>
    )
}