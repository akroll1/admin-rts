import React, { useState, useEffect } from 'react'
import { Text, Button, Flex, Heading, Box, UnorderedList, ListItem, useToast } from '@chakra-ui/react'
import { PoundFighterCard, TableCard } from '../pound-list-fighter-card'
import axios from 'axios'
import { capFirstLetters } from '../../utils/utils'

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
}
export const MyPoundList = ({ user, accessTokenConfig }) => {
  const toast = useToast();
  const [officialPoundList, setOfficialPoundList] = useState([]);
  const [myPoundList, setMyPoundList] = useState([]);
  const [combinedList, setCombinedList] = useState([]);
  const [selectedFighter, setSelectedFighter] = useState({});
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const baseUrl = process.env.REACT_APP_POUND_LIST;

  useEffect(() => {
    if(user){
      const getLists = async () => {
        const url = baseUrl + `/${user.sub}`;
        return await axios.get(url, accessTokenConfig)
        .then(res => {
          // console.log('res 30:  ', res.data)
          const { usersList, officialList } = res.data;
          
          const bothLists = res.data.usersList.concat(res.data.officialList);

          const usersListIds = usersList.map( fighter => fighter.fighterId);

          const filtered = officialList.filter( fighterObj => {
            return !usersListIds.includes(fighterObj.fighterId)
          });
          setCombinedList([...usersList, ...filtered])
          setSelectedFighter(res.data.usersList[0])
        })
        .catch(err => console.log(err));
      }
      getLists()
    }
      
  }, [user]);
  const onDragStart = e => {
    const initialPosition = Number(e.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: combinedList
    });
    // Note: this is only for Firefox.
    e.dataTransfer.setData("text/html", '');
  }
  const onDragOver = e => {
    e.preventDefault();
    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(e.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom);
    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];
    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
      setCombinedList(newList)
    }
  }
  const onDrop = e => {
    setMyPoundList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false
    });
  }
  const onDragLeave = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null
    });
  }

  const submitMyList = () => {
    const list = combinedList.slice(0, 5).map( fighter => fighter.fighterId);
    const poundObj = {
      list,
      updatedAt: new Date(),
      owner: `${user.sub}`
    }
    const url = baseUrl + `/${user.sub}`;
    return axios.put(url, poundObj, accessTokenConfig)
      .then(res => {
        if(res.status === 200){
          toast({ title: 'Updated P4P List!',
              status: 'success',
              duration: 5000,
              isClosable: true,})
      }})
      .catch(err => console.log(err))
  }

  const setFighterProfile = fighterId => {
    const thisFighter = combinedList.filter(fighter => fighterId === fighter.fighterId);
    setSelectedFighter(thisFighter[0]);
  }
  const handleViewProfile = e => {
    const { id } = e.currentTarget;
    console.log('id: ',id)
    //this will go to the fighter page when a user clicks on the fighter card, not the list...
    // console.log('handleViewProfile');
    // console.log('clicked fighter id: ',selectedFighter.fighterId);
  }

  const officialListStyles = { fontWeight: 'bold', color: 'rgb(197, 48, 48)'};
  const myListStyles = { marginLeft: '1rem'};

  return (
    <Flex w="100%" boxSizing="border-box" flexDir="column" alignItems="center" justifyContent="center">
      <Heading as="h2" size="lg" my="5">My Pound-4-Pound List</Heading>
      <Flex flexWrap="wrap-reverse" w="100%" flexDirection="row" alignItems="flex-end" justifyContent="center">
       
        <Flex flex='1 0 40%' boxSizing="border-box" p="3" m="1rem" flexDir="column" alignItems="flex-end" justifyContent="center">
          <Flex w="100%" flexDir="row" justifyContent="center" alignItems="center">
            <Button m="0.5rem" onClick={submitMyList} type="button" colorScheme="blue">
              Save My List
            </Button>
            <Button m="0.5rem" variant="outline">Cancel</Button>
          </Flex>
          <UnorderedList overflow="scroll" h="30rem" ml="0" boxSizing="border-box" w="100%" listStyleType="none">
              {combinedList && combinedList.length > 0 && combinedList.map((item, index) => {
                // console.log('item: ',item)
                if(!item) return;
                return (
                  <ListItem
                    onClick={() => setFighterProfile(item.fighterId)}
                    display="flex" alignItems="center" justifyContent="flex-start"
                    m="3" ml="0" p="2" pl="3" borderRadius="5px"
                    bg="whiteAlpha.400"
                    height='2.5rem'
                    w="100%"
                    key={index}
                    data-position={index}
                    draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    _hover={{ cursor: 'pointer' }}>
                  <Text as="p" style={index > 4 ? myListStyles : officialListStyles}>{index < 5 ? (index + 1) + '.' : ''} </Text>&nbsp;&nbsp;{capFirstLetters(item.firstName)} {capFirstLetters(item.lastName)}
                </ListItem>
              )})}
          </UnorderedList>
        </Flex>
        <Flex flex='1 0 40%' p="3" pt="1rem" m="1rem" mt="3rem">
          <PoundFighterCard handleViewProfile={handleViewProfile} selectedFighter={selectedFighter} />
        </Flex>
      </Flex>
    </Flex>
  )
};