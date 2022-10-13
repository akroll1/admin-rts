import { useState, useEffect } from 'react'
import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, HStack, Input, Stack, StackDivider, Text, Textarea, useColorModeValue, useToast, VStack } from '@chakra-ui/react'
import { FieldGroup } from '../../chakra'
import { SeasonsTable } from '../tables';
import { useScorecardStore } from '../../stores';

export const SeasonsForm = () => {
    const {
        createSeason,
        deleteSeason,
        fetchAllSeasons,
        fetchSeason,
        season,
        seasons,
        updateSeason,
    } = useScorecardStore()

    const [seasonId, setSeasonId] = useState(null)
    const [allSeasons, setAllSeasons] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        end: '',
        seasonTitle: '',
        seasonSubtitle: '',
        seasonBody: '',
        start: '',
        fightIds: []
    });

    useEffect(() => {
        fetchAllSeasons()
    },[])

    useEffect(() => {
        if(seasons.length > 0){
            setAllSeasons(seasons)
        }
    },[seasons])

    useEffect(() => {
        if(season.seasonId){
            setForm(season)
        }
    },[season])

    const handleFormChange = e => {
        const { id, name, value } = e.currentTarget;
        if(name === fightIds){
            setForm([...form, value])
            return
        }
        return setForm({...form, [id]: value });
    }
    
    const handleFetchSeason = e => {
        fetchSeason(seasonId)
    }

    const handleUpdateSeason = e => {
        updateSeason(form)
    }

    const handleCreateSeason = e => {
        console.log('CREATE form: ', form)
        // createSeason(createObj)
    }

    const handleDeleteSeason = e => {
        deleteSeason(seasonId)
    }

    const handleSelectedSeason = e => {
        const { id } = e.currentTarget;
        const [season] = allSeasons.filter( season => season.seasonId === id);
        setForm(season);  
        setSeasonId(season.seasonId)  
    }
    const { fightIds, seasonTitle, seasonSubtitle, seasonBody, start, end } = form;

    return (
        <>
            <Box px={{base: '4', md: '10'}} py="16" maxWidth="3xl" mx="auto">
                <form id="seasons_form" onSubmit={(e) => {e.preventDefault()}}>
                    <Stack spacing="4" divider={<StackDivider />}>
                        <FieldGroup title="Fetch a Season">
                            <VStack width="full" spacing="6">
                                <FormControl id="seasonId">
                                    <FormLabel htmlFor="seasonId">Season ID</FormLabel>
                                    <Input value={seasonId} onChange={ ({ currentTarget: {value} }) => setSeasonId(value.length == 36 ? value : '')} type="text" maxLength={36} />
                                </FormControl>
                                <HStack justifyContent="center" width="full">
                                    <Button 
                                        disabled={!seasonId}  
                                        minW="33%" 
                                        isLoading={isSubmitting} 
                                        loadingText="Searching..." 
                                        onClick={handleFetchSeason} 
                                        type="button" 
                                        colorScheme="solid"
                                    >
                                        Search
                                    </Button>
                                </HStack>
                            </VStack>
                        </FieldGroup>
                        <FieldGroup title="Season Info">
                            <VStack width="full" spacing="6">
                                <FormControl isRequired id="seasonTitle">
                                    <FormLabel htmlFor="seasonTitle">First Name</FormLabel>
                                    <Input required value={seasonTitle} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                                <FormControl isRequired id="seasonSubtitle">
                                    <FormLabel htmlFor="seasonSubtitle">Last Name</FormLabel>
                                    <Input required value={seasonSubtitle} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                               
                                <FormControl id="seasonBody">
                                    <FormLabel>Body</FormLabel>
                                    <Textarea
                                        required
                                        placeholder="Biography..."
                                        value={seasonBody}
                                        onChange={e => handleFormChange(e)}
                                        type="text"
                                        size='md'
                                        rows="6"
                                    />
                                </FormControl>
                                <FormControl isRequired id="fightIds">
                                    <FormLabel htmlFor="fightIds">Fight ID</FormLabel>
                                    <Input name="fightIds" value={fightIds} onChange={e => handleFormChange(e)} type="text" maxLength={100} />
                                </FormControl>
                            </VStack>
                        </FieldGroup>
                    </Stack>
                    <FieldGroup mt="8">
                        <ButtonGroup width="full">
                            <Button 
                                onClick={seasonId ? handleUpdateSeason : handleCreateSeason} 
                                type="submit" 
                                colorScheme="solid"
                            >
                                {seasonId ? `Update Season` : `Create Season`}
                            </Button>
                            <Button 
                                onClick={handleDeleteSeason}
                                variant="outline"
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </FieldGroup>
                </form>
            </Box>
            <SeasonsTable 
                allSeasons={allSeasons} 
                handleSelectedSeason={handleSelectedSeason} 
            />
        </>

    )
}