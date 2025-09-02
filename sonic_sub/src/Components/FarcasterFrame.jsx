import React, { useEffect, useState } from 'react'
import {ethers} from "ethers"
import {createFrames } from "frames.js/next"
import abi from "../../ABI/sonicSub.json"


const CONTRACT_ADDRESS = ""
const ABI = abi
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"

const FarcasterFrame = () => {
       const [provider, setProvider] = useState(null);
       const [signer , setSigner ] = useState(null);
       const [isAnnual , setIsAnnual] = useState(false);
       const [useUSDC, setUseUSDC] = useState(false);

       const [isLoading , setIsLoading] = useState(false);


       useEffect(() => {
        if(window.ethereum){
            
        }
       },[])



  return (
    <div>FarcasterFrame</div>
  )
}

export default FarcasterFrame