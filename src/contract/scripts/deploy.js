// /packages/contracts/scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const hackathonFactory = await hre.ethers.getContractFactory("RegisterHackathon");
  const registerHackathon = await hackathonFactory.deploy();

  await registerHackathon.deployed();

  console.log("deployed to:", counter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });