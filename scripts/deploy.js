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
  // const ApeToken = await ethers.getContractFactory("ApeToken");
  //   const apeToken = await ApeToken.deploy();
  //   await apeToken.deployed();
  //   console.log("ApeToken deployed to:", apeToken.address);
  //   const StakingPool = await ethers.getContractFactory("StakingPool");
  //   const stakingPool = await StakingPool.deploy(
  //     apeToken.address,
  //     "0x81d03bF5e59F42B6088bDeAbEF82096578168fbd"
  //   );
  //   await stakingPool.deployed();
  //   console.log("StakingPool deployed to:", stakingPool.address);

    const StakingPoolV2 = await ethers.getContractFactory("StakingPoolV2");
    const stakingPoolV2 = await StakingPoolV2.deploy(
      // apeToken.address,
      "0xcf3af1Bb0Cea2a30a4E792902F01d4D545610709",
      "0x81d03bF5e59F42B6088bDeAbEF82096578168fbd"
    );
    await stakingPoolV2.deployed();
    console.log("StakingPoolV2 deployed to:", stakingPoolV2.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
