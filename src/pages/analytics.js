import React from 'react'
import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { AnalyticsSidebar } from '../components/sidebars'

const Analytics = () => {
    const { id } = useParams();

    return(
        <Flex>
            <AnalyticsSidebar />
        </Flex>
    )
}
export default Analytics