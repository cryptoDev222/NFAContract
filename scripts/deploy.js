// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ApeToken = await ethers.getContractFactory("ApeToken");
    const apeToken = await ApeToken.deploy();
    await apeToken.deployed();
    console.log("ApeToken deployed to:", apeToken.address);
    const StakingPool = await ethers.getContractFactory("StakingPool");
    const stakingPool = await StakingPool.deploy(
      apeToken.address,
      "0xD84E94F8Fed1B49B3f18440E9817d1Fa86e21c78"
    );
    await stakingPool.deployed();
    console.log("Staking Pool deployed to:", stakingPool.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
