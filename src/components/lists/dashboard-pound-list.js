import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup, Flex, Heading, ListItem, Text, UnorderedList, useToast } from '@chakra-ui/react'
import axios from 'axios'

import { capFirstLetters } from '../../utils'
import { useUserStore } from '../../stores'
import { Navigate, useLocation } from 'react-router'

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
}
export const DashboardPoundList = ({ accessTokenConfig }) => {
  const location = useLocation();
  const toast = useToast();  
  const user = useUserStore( user => user);
  const [officialPoundList, setOfficialPoundList] = useState([]);
  const [myPoundList, setMyPoundList] = useState([]);
  const [combinedList, setCombinedList] = useState([]);
  const [selectedFighter, setSelectedFighter] = useState({});
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);
  const baseUrl = process.env.REACT_APP_POUND_LIST;
  
  let config;
  const { username } = user;
  const accessToken = localStorage.getItem('CognitoIdentityServiceProvider.' + process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID + '.' + username + '.accessToken');
  if(username && accessToken){
    config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };        
  } else {
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  }
  ////////////////////////////////////////////////////////
  useEffect(() => {
      const getLists = async () => {
        const url = baseUrl + `/${user.sub}`;
        return await axios.get(url, config)
          .then(res => {
            const { usersList, officialList } = res.data;
            const bothLists = res.data.usersList.concat(res.data.officialList);
            const usersListIds = usersList.map( fighter => fighter.fighterId);
            const filtered = officialList.filter( fighterObj => {
              return !usersListIds.includes(fighterObj.fighterId)
            });
            setCombinedList([...usersList, ...filtered])
            setOfficialPoundList(officialList)
            setSelectedFighter(res.data.usersList[0])
          })
          .catch(err => console.log(err));
      }
      getLists();
  }, []);

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
    return axios.put(url, poundObj, config)
      .then(res => {
        if(res.status === 200){
          toast({ title: 'Updated P4P List!',
              status: 'success',
              duration: 5000,
              isClosable: true,})
      }})
      .catch(err => console.log(err))
  }

  const officialListStyles = { fontWeight: 'bold', color: '#e80000'};
  const myListStyles = { };

  return (
    <Flex id="pound_lists" boxSizing="border-box" flexDir="column" alignItems="center" justifyContent="center">
      <Heading as="h2" size={["sm", "md", "lg"]} p="4" m="1">Pound-4-Pound Lists</Heading>
      <Flex p="4" m="4" mt="0" w={["100%", "90%", "80%"]} flexDir={["column", "row"]} alignItems="flex-start" justifyContent="space-evenly">
        <Flex 
          as="section" 
          flex="1 0 40%" 
          flexDir="column" 
          alignItems="center" 
          justifyContent="center"
          p="4"
          pt="0"
          m="4"
          mt="0"
        >
          <ButtonGroup mb="1rem">
            <Button onClick={submitMyList} type="button" colorScheme="blue">
              Save My List
            </Button>
            <Button variant="outline">Cancel</Button>
          </ButtonGroup>

          <UnorderedList overflow="scroll" h="30rem" ml="0" boxSizing="border-box" w="100%" listStyleType="none">
              { combinedList?.length > 0 && combinedList.map((item, i) => {
                // console.log('item: ',item)
                if(!item) return;
                return (
                  <ListItem
                    display="flex" 
                    alignItems="center" 
                    justifyContent="flex-start"
                    p="4"
                    m="2"
                    borderRadius="5px"
                    bg={i > 4 ? "whiteAlpha.200" : "whiteAlpha.400"}
                    height='2.5rem'
                    // w="100%"
                    key={i}
                    data-position={i}
                    draggable
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    _hover={{ cursor: 'pointer' }}>
                  <Text as="p" style={i > 4 ? myListStyles : officialListStyles}>{i + 1} </Text>&nbsp;&nbsp;{capFirstLetters(item.firstName)} {capFirstLetters(item.lastName)}
                </ListItem>
              )})}
          </UnorderedList>
        </Flex>
        <Flex 
          as="section" 
          flex="1 0 40%" 
          flexDir="column" 
          alignItems="center" 
          justifyContent="center"
          p="4"
          pt="0"
          m="4"
          mt="0"
        >
          <Heading as="h3" p="4" pt="0" size={["sm", "md", "lg"]}>The FightSync List</Heading> 
          <UnorderedList  h="30rem" boxSizing="border-box" w="100%" listStyleType="none">
              {officialPoundList?.length > 0 && officialPoundList.slice(0,10).map((item, i) => {
                // console.log('item: ',item)
                if(!item) return;
                return (
                  <ListItem
                    borderTopRadius={i === 0 ? "md" : "0"}
                    display="flex" 
                    alignItems="center" 
                    justifyContent="flex-start"
                    p="4"
                    bg={"whiteAlpha.200"}
                    height='2.5rem'
                    w="100%"
                    key={i}
                    _hover={{ cursor: 'pointer' }}
                  >
                  <Text as="p" style={officialListStyles}>{i + 1} </Text>&nbsp;&nbsp;{capFirstLetters(item.firstName)} {capFirstLetters(item.lastName)}
                </ListItem>
              )})}
          </UnorderedList>
        </Flex>
      </Flex>
    </Flex>
  )
};