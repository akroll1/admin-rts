import { 
    Flex, 
    Heading 
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'

export const ScorecardsNavGroup = props => {

    const { 
        active, 
        children, 
        id, 
        label, 
        handleHideShow, 
        handleSelectSeason = () => '',
    } = props

    const selectSeason = e => {
        const { id } = e.currentTarget
        if(handleHideShow){
            return handleHideShow(id)
        }
        handleSelectSeason(id)
    }

    return (  
        <Flex
            names={'scorecard_nav_group'}
            w="100%"
            flexDir="column"
            justifyContent="center"
            alignItems="flex-start"
            onClick={selectSeason}
            id={id}
            mb="2"
        >
            <Flex
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                borderRadius="3px"
                _hover={{
                    color:'#fcfcfc',
                    cursor: 'pointer',
                }}
            >
                <Heading
                    w="100%"
                    p="1"
                    pl="2"
                    _hover={{ color:'#fcfcfc'}}
                    fontSize={id === 'title' ? "3xl" : "2xl"}
                    as="h3" 
                    color={id === 'title' ? "fsl-highlight-heading-text" : '#dadada'}
                >
                    {label}
                </Heading>

                <Flex
                    display={id === 'fight' ? 'none' : 'flex'}
                    mr="4"
                >
                    { active 
                        ? 
                            <TriangleUpIcon
                                transition="all 2.8s"
                                color={id !== 'title' ? "#cacaca" : "transparent"}
                            /> 
                        : 
                            <TriangleDownIcon 
                                color={id !== 'title' ? "#cacaca" : "transparent"}
                            /> 
                    }
                </Flex>
            </Flex>    
            <Flex w="100%">{children}</Flex>
        </Flex>
    )
}