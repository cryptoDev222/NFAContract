const { expect } = require("chai");

describe("Staking", function () {
  it("Should deployed successfully", async function () {
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

    await stakingPool.initiateFemale([601,602,603], [4, 4, 4]);
    await stakingPool.initiateMale([604,605,606], [4, 4, 4]);
    await stakingPool.initiateBaby([607,608,609,610,611,612]);
    await stakingPool.initiateBabies([601,602,603], [607,608,609]);
    await stakingPool.initiateBabies([601,602,603], [610,611,612]);

    await apeToken.setApprovalForAll(stakingPool.address, true);

    await stakingPool.initiateCertificates([605]);

    await stakingPool.stakeBatch([601, 604, 605, 606, 607, 608, 609, 610]);

    let owner = await stakingPool.owner();
    console.log("owner", owner);
    let stakedApe = await stakingPool.getStaked("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log("Staked Ape", stakedApe);
    let endTime = await stakingPool.breedingEnd(601);
    console.log("EndTime 601:", endTime);
    let endTime1 = await stakingPool.breedingEnd(602);
    console.log("EndTime 602:", endTime1);
    let endTime2 = await stakingPool.breedingEnd(603);
    // await stakingPool.claimBaby();
    console.log("EndTime 603:", endTime2);
    let userMultiplier = await stakingPool.userMultiplier("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log("UserMultiplier", userMultiplier);
    let totalSupply = await stakingPool.totalSupply();
    console.log("TotalSupply:", totalSupply);
    stakingPool.on("Claimed", function(evt) {
      console.log("event", evt);
    })
  });
});
