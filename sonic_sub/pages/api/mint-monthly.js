import {ethers} from "ethers"
import abi  from "../../ABI/sonicSub.json"
export default async function handler(req, res) {

    const ABI = abi

    const calldata = new ethers.Interface(ABI).encodeFunctionData()
}