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
        handleSelectSeason,
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
        >
            <Flex
                justifyContent="space-between"
                alignItems="center"
                w="100%"
                borderRadius="3px"
                _hover={{
                    color:'#fcfcfc',
                    cursor: 'pointer',
                    background: '#535353'
                }}
            >
                <Heading
                    w="100%"
                    pt="1"
                    pl="2"
                    _hover={{ color:'#fcfcfc'}}
                    fontSize={id === 'fight' ? '2xl' : "lg"}
                    as="h3" 
                    color="fsl-highlight-heading-text"
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
                                color="#cacaca" 
                            /> 
                        : 
                            <TriangleDownIcon 
                                color="#cacaca" 
                            /> 
                    }
                </Flex>
            </Flex>    
            <Flex w="100%">{children}</Flex>
        </Flex>
    )
}