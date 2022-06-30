import React from 'react'
import { Heading, Center } from '@chakra-ui/react'
import { MyScorecardsTable } from '../components/tables'

export const MyScorecards = ({ scorecards, handleFormSelect }) => {
    return (
        <>
            <Center>
                <Heading my="4" as="h1" size="2xl">My Scorecards</Heading>
            </Center>
            <MyScorecardsTable handleFormSelect={handleFormSelect} scorecards={scorecards} />
        </>
    )
}
export default MyScorecards