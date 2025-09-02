import React, { useEffect, useState, version } from 'react'
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
            const provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(provider)
            provider.getSigner().then(setSigner)
        }
       },[]);

       const mintSub = async () => {
                  if(!signer) return alert("Please connect your wallet")
            setIsLoading(true);


                  try {

                    const contract = new ethers.Contract(CONTRACT_ADDRESS,ABI,signer);

                    if(useUSDC){
                        const usdc = new ethers.Contract(USDC_ADDRESS,['function approve(address,uint256)'], signer);

                        const price = isAnnual ? '100000000' : '10000000';
                        
                        await usdc.approve(CONTRACT_ADDRESS,price);
                        await contract.mint(isAnnual,true)
                    } else { 
                        const price = isAnnual ? '0.05' : '0.005';
                        await contract.mint(isAnnual, false, {value: ethers.parseEther(price)})

                    } 
                      alert("Minted!")
                    
                  } catch (error) {
                     console.error(e)
                     alert("Mint failed")
                  }

                  setIsLoading(false)

       }
         

       const frames = createFrames({basePath: '/api'});

       const frameHandler = frames( async () => ({
         
        image: 'pinata url',
        buttons: [
            { label: 'Monthly ($10)', action: "tx",target: "api/mint-monthly"},
            { label: 'Annual ($100)', action: "tx",target: "api/mint-annual"},
        ],
           accepts : [{id: "farcaster"},{version:'vNext'}],
       }))
          



  return (
    <div>
      <h1>Hypersub: Join the Community</h1>
      <button onClick={() => { setIsAnnual(false); mintSub(); }} disabled={isLoading}>
        Mint Monthly Sub
      </button>
      <button onClick={() => { setIsAnnual(true); mintSub(); }} disabled={isLoading}>
        Mint Annual Sub
      </button>
      <label>
        <input type="checkbox" checked={useUSDC} onChange={(e) => setUseUSDC(e.target.checked)} />
        Pay with USDC
      </label>
    </div>
  )
}

export default FarcasterFrame