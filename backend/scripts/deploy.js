const { ethers } = require("hardhat");


async function main() {
  const Assetmgt = await ethers.getContractFactory("Assetmgt");
  const AssetmgtDeployment = await Assetmgt.deploy();
  await AssetmgtDeployment.deployed();

  console.log("Your smart contract is deployed at", AssetmgtDeployment.address);
}

main()
  .then(()=> process.exit(0))
  .catch((error) =>{
    console.error(error);
    process.exitCode= 1;
  });