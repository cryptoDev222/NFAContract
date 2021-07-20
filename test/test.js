const { expect } = require("chai");
const apeTokenInterface = require("./ApeToken.json");
const { forkFrom } = require("../forkFrom");
const stakingPoolInterface = require("./StakingPool.json");
const { Signer } = require("ethers");

describe("Staking", function () {
  const apeTokenAddress = "0x495f947276749ce646f68ac8c248420045cb7b5e";
  const stakingPoolAddress = "0x3bcCBBdE5B9ca293E065aA17cC3123f24B4e005b";
  const TOKEN_OWNER_ADDR = "0x81d03bF5e59F42B6088bDeAbEF82096578168fbd";
  let stakingPool, account, tokenOwner, apeToken, breedingEnd, stakingPoolV2;

  before(async function () {
    this.timeout(60000);
    [account] = await ethers.getSigners();
    await forkFrom(12766421);
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [TOKEN_OWNER_ADDR],
    });

    // get tokenOwner
    tokenOwner = await ethers.getSigner(
      "0x81d03bF5e59F42B6088bDeAbEF82096578168fbd"
    );

    apeToken = new ethers.Contract(
      apeTokenAddress,
      apeTokenInterface.abi,
      hre.ethers.getDefaultProvider()
    );
    stakingPool = new ethers.Contract(
      stakingPoolAddress,
      stakingPoolInterface.abi,
      hre.ethers.getDefaultProvider()
    );

    let staked = await stakingPool
      .connect(tokenOwner)
      .getStaked(TOKEN_OWNER_ADDR);
    console.log("staked", staked);

    breedingEnd = await stakingPool
      .connect(tokenOwner)
      .breedingEnd(
        "111088039310991980747582500580362765978371467560142591247344516939188117962753"
      );

    console.log("breedingEnd Time", breedingEnd);

    const StakingPoolV2 = await ethers.getContractFactory("StakingPoolV2");
    stakingPoolV2 = await StakingPoolV2.deploy(
      apeToken.address,
      account.address
    );
    await stakingPoolV2.deployed();
    console.log("stakingPoolV2 deployed to:", stakingPoolV2.address);
  });

  it("Should breedingEnd same", async function () {
    await stakingPool.connect(tokenOwner).withdrawAll();

    await stakingPoolV2.initiateFemale(
      [
        "111088039310991980747582500580362765978371467560142591247344516939188117962753",
      ],
      [4]
    );

    await stakingPoolV2.setV1Data(
      [
        "111088039310991980747582500580362765978371467560142591247344516939188117962753",
      ],
      [breedingEnd]
    );

    await apeToken
      .connect(tokenOwner)
      .setApprovalForAll(stakingPoolV2.address, true);

    await stakingPoolV2
      .connect(tokenOwner)
      .migrateV1([
        "111088039310991980747582500580362765978371467560142591247344516939188117962753",
      ]);

    let v2BreedingEnd = await stakingPoolV2
      .connect(tokenOwner)
      .breedingEnd(
        "111088039310991980747582500580362765978371467560142591247344516939188117962753"
      );

    expect(v2BreedingEnd).to.equal(breedingEnd);
  }).timeout(600000);
});
