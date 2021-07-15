const { expect } = require("chai");
const apeTokenInterface = require("./ApeToken.json");
const { forkFrom } = require("../forkFrom")
const stakingPoolInterface = require("./StakingPool.json");

describe("Staking", function () {
  const apeTokenAddress = '0x495f947276749ce646f68ac8c248420045cb7b5e';
  const stakingPoolAddress = '0x3bcCBBdE5B9ca293E065aA17cC3123f24B4e005b'
  const TOKEN_OWNER_ADDR = '0x81d03bF5e59F42B6088bDeAbEF82096578168fbd'

  it("Should deployed successfully", async function () {
    const [account] = await ethers.getSigners();
    // await forkFrom(12766421);
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [TOKEN_OWNER_ADDR],
    });
    // await hre.network.provider.send("hardhat_setBalance", [TOKEN_OWNER_ADDR, "0x100000000000000"])

    // get tokenOwner 
    let tokenOwner = await ethers.getSigner("0x81d03bF5e59F42B6088bDeAbEF82096578168fbd");

    // let apeToken = new ethers.Contract(apeTokenAddress, apeTokenInterface.abi, hre.ethers.getDefaultProvider());
    // let stakingPool = new ethers.Contract(stakingPoolAddress, stakingPoolInterface.abi, hre.ethers.getDefaultProvider());

    // let staked = await stakingPool.connect(tokenOwner).getStaked(TOKEN_OWNER_ADDR)
    // console.log("staked", staked);

    // // await stakingPool.connect(tokenOwner).withdrawAll()
    // await stakingPool.connect(tokenOwner).claimBaby()
    // stakingPool.connect(tokenOwner).on("Claimed", function(evt) {
    //   console.log("event", evt);
    // });

    // let breedingEnd = await stakingPool.connect(tokenOwner).breedingEnd('111088039310991980747582500580362765978371467560142591247344516939188117962753')
    const ApeToken = await ethers.getContractFactory("ApeToken");
    const apeToken = await ApeToken.deploy();
    await apeToken.deployed();
    console.log("ApeToken deployed to:", apeToken.address);
    const StakingPool = await ethers.getContractFactory("StakingPool");
    const stakingPool = await StakingPool.deploy(
      apeToken.address,
      "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
    );
    await stakingPool.deployed();
    console.log("stakingPool deployed to:", stakingPool.address);

    const StakingPoolV2 = await ethers.getContractFactory("StakingPoolV2");
    const stakingPoolV2 = await StakingPoolV2.deploy(apeToken.address, account.address);
    console.log("stakingPool deployed to:", stakingPoolV2.address);

    await stakingPoolV2.deployed();

    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 601, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 602, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 603, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 604, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 605, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 606, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 607, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 608, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 609, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 610, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 611, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 612, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 613, 1);
    await apeToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 614, 1);

    await stakingPool.initiateFemale([601,602,603], [2, 4, 2]);
    await stakingPool.initiateMale([604,605,606], [4, 2, 4]);
    await stakingPool.initiateBaby([607,608,609,610,611,612]);
    await stakingPool.initiateBabies([601,602,603], [607,608,609]);
    await stakingPool.initiateBabies([601,602,603], [610,611,612]);
    await stakingPool.initiateBabies([602], [613]);
    await stakingPool.initiateBabies([602], [614]);

    await stakingPoolV2.initiateFemale([601,602,603], [2, 4, 2]);
    await stakingPoolV2.initiateMale([604,605,606], [4, 2, 4]);
    await stakingPoolV2.initiateBaby([607,608,609,610,611,612]);
    await stakingPoolV2.initiateBabies([601,602,603], [607,608,609]);
    await stakingPoolV2.initiateBabies([601,602,603], [610,611,612]);
    await stakingPoolV2.initiateBabies([602], [613]);
    await stakingPoolV2.initiateBabies([602], [614]);
    await stakingPoolV2.setV1Data([601, 602, 603], [1200, 1300, 1250]);

    await apeToken.setApprovalForAll(stakingPool.address, true);
    await apeToken.setApprovalForAll(stakingPoolV2.address, true);

    await stakingPool.initiateCertificates([605]);

    // await stakingPool.stakeBatch([601, 604, 605, 606, 607, 608,609,610,611, 612]);
    await stakingPoolV2.migrateV1([601, 604, 605, 606, 608,609,610,611, 612]);

    let owner = await stakingPool.owner();
    console.log("owner", owner);
    let endTime = await stakingPool.breedingEnd(601);
    console.log("EndTime 601:", endTime);
    let endTime1 = await stakingPool.breedingEnd(602);
    console.log("EndTime 602:", endTime1);
    let endTime2 = await stakingPool.breedingEnd(603);
    console.log("EndTime 603:", endTime2);
    let baby = await stakingPool.getBaby(601);
    console.log("BabyId", baby);
    let stakedApe = await stakingPoolV2.getStaked("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log("Staked Ape", stakedApe);
    // await stakingPool.claimBaby();
    // await stakingPool.claimBaby();
    // await stakingPool.claimBaby();
    // await stakingPool.claimBaby();
    let userMultiplier = await stakingPoolV2.userMultiplier("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log("UserMultiplier", userMultiplier);
    let totalSupply = await stakingPoolV2.totalSupply();
    console.log("TotalSupply:", totalSupply);
    stakingPoolV2.on("Claimed", function(evt) {
      console.log("event", evt);
    });
  }).timeout(600000);
});
