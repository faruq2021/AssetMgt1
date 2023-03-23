import React, { useState } from 'react';
import {
  Box,
  Stack,
  Button,
  Input,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { ethers } from 'ethers';

const AddUser = ({ contract }) => {
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [initialWorth, setInitialWorth] = useState('');

  const toast = useToast();
  const successToast = () =>
    toast({
      title: 'User Created.',
      description: 'User have been created successfully',
      position: 'top',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });

  const handleSubmit = async () => {
    try {
      await contract.addUser(
        address,
        name,
        ethers.utils.parseEther(initialWorth.toString()),
        {
          gasLimit: 1000000,
        }
      );
      successToast();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      w={'50%'}
      mx={'auto'}
      p={'30px'}
      bg={useColorModeValue('gray.200', 'gray.700')}
      as={'form'}
      mt={10}
      rounded={'xl'}
    >
      <Stack spacing={4}>
        <Input
          placeholder="Wallet Address"
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={e => setAddress(e.target.value)}
        />
        <Input
          placeholder="Name"
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="Initial Value"
          bg={'gray.100'}
          border={0}
          color={'gray.500'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={e => setInitialWorth(e.target.value)}
        />
      </Stack>
      <Button
        fontFamily={'heading'}
        mt={8}
        w={'full'}
        onClick={handleSubmit}
        bgGradient="linear(to-r, red.400,pink.400)"
        color={'white'}
        _hover={{
          bgGradient: 'linear(to-r, red.400,pink.400)',
          boxShadow: 'xl',
        }}
      >
        Add user
      </Button>
    </Box>
  );
};

export default AddUser;
