import React, { useState } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiMenu } from 'react-icons/fi';

import { useContract, useSigner, useProvider } from 'wagmi';
import { optimism } from 'wagmi/chains';
import ensRegistryABI from '../artifacts/contracts/Assetmgt.sol/Assetmgt.json';

import AddUser from './AddUser';
import ViewUser from './ViewUser';
import CurrentValue from './CurrentValue';

const LinkItems = [
  { name: 'Add User', icon: FiHome, to: 'addUser' },
  { name: 'View User', icon: FiTrendingUp, to: 'viewUser' },
  { name: 'Get Current Value', icon: FiCompass, to: 'currentValue' },
];

export default function SimpleSidebar({ children }) {
  const [toDisplay, setToDisplay] = useState('addUser');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const CONTRACT_ADDRESS = '0x64ce516D3a1f4d7053c512dc34B0Ab92F957415d';

  const provider = useProvider();
  const { data: signer } = useSigner({
    chainId: optimism.id,
  });

  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ensRegistryABI.abi,
    signerOrProvider: signer || provider, // use signer if available, else use provider
  });

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        setToDisplay={setToDisplay}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Flex alignItems="center" mx="8" justifyContent="space-between">
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
        {toDisplay === 'viewUser' ? (
          <ViewUser contract={contract} />
        ) : toDisplay === 'addUser' ? (
          <AddUser contract={contract} />
        ) : (
          <CurrentValue contract={contract} />
        )}
      </Flex>
    </Box>
  );
}

const SidebarContent = ({ onClose, setToDisplay, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link href="/">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            back
          </Text>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          setToDisplay={setToDisplay}
          to={link.to}
          key={link.name}
          icon={link.icon}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ to, icon, children, setToDisplay, ...rest }) => {
  return (
    // <Link
    //   href='#'
    //   style={{ textDecoration: 'none' }}
    //   _focus={{ boxShadow: 'none' }}
    // >
    <Flex
      align="center"
      onClick={() => setToDisplay(to)}
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
    // </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
