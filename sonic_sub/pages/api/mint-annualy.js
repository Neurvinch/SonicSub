import {ethers} from "ethers"
import abi  from "../../ABI/sonicSub.json"
export default async function handler(req, res) {

    const ABI = abi

    const calldata = new ethers.Interface(ABI).encodeFunctionData("mint", [true,true]);

    res.json({
        chainId: 'eip155:8453',
        method: 'eth_sendTransaction',
        params : {abi: ABI, to: CONTRACT_ADDRESS, data: calldata, value: '0'}
    })
}


 /// need to adapt this for vite 