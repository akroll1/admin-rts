import { 
    Flex, 
    Heading 
} from '@chakra-ui/react'
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { ScoringSidebarNavGroupsEnum } from '../../../../stores'

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

    const isTitle = id === ScoringSidebarNavGroupsEnum.FIGHT;
    
    return (  
        <Flex
            names={'scorecard_nav_group'}
            w="100%"
            flexDir="column"
            justifyContent="center"
            alignItems="flex-start"
            onClick={selectSeason}
            id={id}
            boxSizing="border-box"
            px="2"
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
                    pt={isTitle ? "4" : "2"}
                    _hover={{ color:'#fcfcfc'}}
                    fontSize={isTitle ? ["2xl", "2xl","3xl"] : ["xl", "xl", "2xl"]}
                    as="h3" 
                    color={isTitle || active ? '#fafafa' : 'gray.300'}
                >
                    {label}
                </Heading>

                <Flex
                    display={id === 'fight' ? 'none' : 'flex'}
                    // mr="4"
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