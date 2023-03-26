import React, { useState } from 'react';
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

export default function ViewUser({ contract }) {
  const [address, setAddress] = useState('');
  const [data, setData] = useState([]);

  const handleSubmit = async () => {
    try {
      const result = await contract.getUser(address);
      setData(result);
      console.log('Result:', result);
    } catch (error) {
      console.error(error);
    }
  };

  // const timestamp = data[2];
  // const date = new Date(timestamp * 1000);
  // const options = {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  // };
  const timestamp = Date.now();
const date = new Date(timestamp);
const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};
const formattedDate = date.toLocaleString(undefined, options);

  // const formattedDate = date.toLocaleString(undefined, options);

  return (
    <Flex minH={'50%'} mx={'auto'} align={'center'} justify={'center'} py={12}>
      <Stack
        boxShadow={'2xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        p={10}
        spacing={8}
        align={'center'}
      >
        <ViewIcon w={24} h={24} />
        <Stack align={'center'} spacing={2}>
          <Heading
            textTransform={'uppercase'}
            fontSize={'3xl'}
            color={useColorModeValue('gray.800', 'gray.200')}
          >
            View User
          </Heading>
          <Text fontSize={'lg'} color={'gray.500'}>
            Subscribe to our newsletter & stay up to date!
          </Text>
        </Stack>
        <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
          <Input
            type={'text'}
            placeholder={'Address'}
            color={useColorModeValue('gray.800', 'gray.200')}
            bg={useColorModeValue('gray.100', 'gray.600')}
            rounded={'full'}
            border={0}
            _focus={{
              bg: useColorModeValue('gray.200', 'gray.800'),
              outline: 'none',
            }}
            onChange={e => setAddress(e.target.value)}
          />
          <Button
            bg={'blue.400'}
            rounded={'full'}
            color={'white'}
            flex={'1 0 auto'}
            _hover={{ bg: 'blue.500' }}
            _focus={{ bg: 'blue.500' }}
            onClick={handleSubmit}
          >
            View User
          </Button>
        </Stack>
        {data.length !== 0 ? (
          <Box alignSelf={'flex-start'}>
            <Heading textTransform={'uppercase'} fontSize={'xl'} mb={'20px'}>
              Name: {data[0]}
            </Heading>
            <Heading textTransform={'uppercase'} fontSize={'xl'} mb={'20px'}>
              Balance:{' '}
              {(parseFloat(data[1]?.toString()) / 1000000000000000000).toFixed(
                2
              )}
            </Heading>
            <Heading textTransform={'uppercase'} fontSize={'xl'} mb={'20px'}>
              Time: {formattedDate}
            </Heading>
          </Box>
        ) : (
          <h1>Enter an address to view User</h1>
        )}
      </Stack>
    </Flex>
  );
}
