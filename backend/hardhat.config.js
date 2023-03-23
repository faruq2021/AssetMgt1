require('@nomicfoundation/hardhat-toolbox');

// const QUICKNODE_HTTP_URL =
//   'https://thrilling-proportionate-emerald.ethereum-goerli.discover.quiknode.pro/1e96b48574f9e3b868264a87c2cf5fcf06100e60/';

const Alchemy_HTTP_URL =
  'https://eth-goerli.g.alchemy.com/v2/fapRqQ1mH--mgvuLFA_w_CoNLcfl-j-_';

const PRIVATE_KEY =
  'ca11fb07a97f864196e982cb2f86497a9ab20af47773f3aef61b555bed65df29';

module.exports = {
  solidity: '0.8.9',
  paths: {
    artifacts: '../frontend/src/artifacts',
  },
  networks: {
    goerli: {
      url: Alchemy_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
