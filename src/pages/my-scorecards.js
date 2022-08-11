import React from 'react'
import { Heading, Center } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'

export const MyScorecards = ({ scorecards }) => {
    return (
        <>
            <Center>
                <Heading p="4" as="h1" size="xl">My Scorecards</Heading>
            </Center>
            <MyScorecardsTable scorecards={scorecards} />
        </>
    )
}
export default MyScorecards