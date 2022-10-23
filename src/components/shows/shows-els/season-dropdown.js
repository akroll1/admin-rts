import { useEffect, useState } from "react";
import { Flex, Heading, Select } from "@chakra-ui/react"

export const SeasonsDropdown = () => {
    const [season, setSeason] = useState('')
    const seasons = [
        {
            label: 'Season 1',
            value: 'season1',
            seasonID: '1234-5678'
        },
        {
            label: 'Season 2',
            value: 'season2',
            seasonID: '7396-8832'
        },
        {
            label: 'Season 3',
            value: 'season3',
            seasonID: '7890-1234'
        },
        {
            label: 'Fantasy- Heavyweights',
            value: 'fantasyheavyweights',
            seasonID: '5678-91000'
        }
    ];

    const handleSelect = e => {
        const { value } = e.currentTarget;
        console.log('value: ', value)
        const [selected] = seasons.filter( season => season.seasonID === value)
        setSeason(selected)
    }

    const handleSeasonClick = e => {
        console.log('season')
        document.querySelector('#season_selector').click()
    }

    console.log('season: ', season)

    return (
        <Flex
            w="100%"
            flexDir="column"
            alignItems="center"
            justifyContent="flex-start"
        >

            <Heading 
                textAlign="left" 
                as="h1" 
                size="xl"
                w="100%"
                color="gray"
                // onClick={handleSeasonClick}
            >
                Season 2
            </Heading>
                {/* <Select
                    id="season_selector"
                    onClick={handleSelect}
                    maxH="4"
                    opacity="1"
                    placeholder="hey"
                >
                    { seasons.length > 0 && seasons.map( season => {
                        const { label, seasonID, value } = season
                        return (
                            <option 
                                onClick={() => console.log('hey')}
                                value={seasonID}
                                key={seasonID}
                                id={seasonID}
                            >
                                {label}
                            </option>
                        )


                    })}

                </Select> */}
        </Flex>

    )
}