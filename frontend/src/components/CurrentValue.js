import React, { useState } from 'react';
import {
  Box,
  Stack,
  Heading,
  Button,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

const CurrentValue = ({ contract }) => {
  const [address, setaddress] = useState('');
  const [data, setData] = useState({});

  const handleSubmit = async () => {
    try {
      const [initialValue, balance, currentValue] = await contract.getCurrentValue(address);
      setData({ initialValue, balance, currentValue });
      console.log('Result:', initialValue, balance, currentValue);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      w={'50%'}
      mx={'auto'}
      p={'30px'}
      as={'form'}
      mt={10}
      bg={useColorModeValue('gray.200', 'gray.700')}
      rounded={'xl'}
    >
      <Stack spacing={4}>
        <Input
          placeholder="Address"
          border={0}
          color={'gray.500'}
          bg={'gray.100'}
          _placeholder={{
            color: 'gray.500',
          }}
          onChange={e => setaddress(e.target.value)}
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
        Current Value
      </Button>
      {console.log('data', data)}
      {data.currentValue ? (
        <Box mt={'20px'} alignSelf={'flex-start'}>
          <Heading textTransform={'uppercase'} fontSize={'xl'}>
            Initial Value:{' '}
            {(parseFloat(data.initialValue?.toString()) / 1000000000000000000).toFixed(2)}
          </Heading>
          <Heading textTransform={'uppercase'} fontSize={'xl'}>
            Balance:{' '}
            {(parseFloat(data.balance?.toString()) / 1000000000000000000).toFixed(2)}
          </Heading>
          <Heading textTransform={'uppercase'} fontSize={'xl'}>
            Current Value:{' '}
            {(parseFloat(data.currentValue?.toString()) / 1000000000000000000).toFixed(2)}
          </Heading>
        </Box>
      ) : (
        <Heading mt={'20px'} fontSize={'lg'}>
          Enter an address to view current Value
        </Heading>
      )}
    </Box>
  );
};

export default CurrentValue;

// import React, { useState } from 'react';
// import {
//   Box,
//   Stack,
//   Heading,
//   Button,
//   Input,
//   useColorModeValue,
// } from '@chakra-ui/react';

// const CurrentValue = ({ contract }) => {
//   const [address, setaddress] = useState('');
//   const [data, setData] = useState([]);

//   const handleSubmit = async () => {
//     try {
//       const result = await contract.getCurrentValue(address);
//       setData(result);
//       console.log('Result:', result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Box
//       w={'50%'}
//       mx={'auto'}
//       p={'30px'}
//       as={'form'}
//       mt={10}
//       bg={useColorModeValue('gray.200', 'gray.700')}
//       rounded={'xl'}
//     >
//       <Stack spacing={4}>
//         <Input
//           placeholder="Address"
//           border={0}
//           color={'gray.500'}
//           bg={'gray.100'}
//           _placeholder={{
//             color: 'gray.500', 
//           }}
//           onChange={e => setaddress(e.target.value)}
//         />
//       </Stack>
//       <Button
//         fontFamily={'heading'}
//         mt={8}
//         w={'full'}
//         onClick={handleSubmit}
//         bgGradient="linear(to-r, red.400,pink.400)"
//         color={'white'}
//         _hover={{
//           bgGradient: 'linear(to-r, red.400,pink.400)',
//           boxShadow: 'xl',
//         }}
//       >
//         Current Value
//       </Button>
//       {console.log('data', data)}
//       {data.length !== 0 ? (
//         <Box mt={'20px'} alignSelf={'flex-start'}>
//           <Heading textTransform={'uppercase'} fontSize={'xl'}>
//             Current Value:{' '}
//             {(parseFloat(data?.toString()) / 1000000000000000000).toFixed(2)}
//           </Heading>
//         </Box>
//       ) : (
//         <Heading mt={'20px'} fontSize={'lg'}>
//           Enter an address to view current Value
//         </Heading>
//       )}
//     </Box>
//   );
// };

// export default CurrentValue;
