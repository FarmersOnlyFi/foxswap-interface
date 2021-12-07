import { StaticJsonRpcProvider } from "@ethersproject/providers";
import { Networks } from "./bond/constants";
import { BondingCalcContract } from "../constants/abis"
import { ethers } from "ethers";
import getAddresses from "../helpers/bond/constants";

export function getBondCalculator(networkID: Networks, provider: StaticJsonRpcProvider) {
    const addresses = getAddresses();
    return new ethers.Contract(addresses.TIME_BONDING_CALC_ADDRESS, BondingCalcContract, provider);
}
