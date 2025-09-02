import React, { useEffect, useState } from 'react'
import {ethers} from "ethers"

const Community = () => {
    const [isValid, setIsValid] = useState(false);    

    const [provider, setProvider] = useState(null);

   useEffect( () => {
      
    if(window.etherum) {
        const provider = new ethers.BrowserProvider(window.etherum)
        setProvider(provider) 
    }
   }, [])
      
   const checkAccess = async  () => {
      if(!provider) return ;
        
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, AbiCoder, provider)

      const balance = await contract.balanceOf(address)

      if (balance > 0) {
          const tokenId = await contract.tokenOfOwnerByIndex(address, 0);

          const valid = await contract.isValid(tokenId);
          setIsValid(valid);
      }
   }
    useEffect( () => {
      checkAccess();
   },[provider])

 if (!isValid) return <div>Buy a sub to access! <a href="/frame">Mint</a></div>;

  return <div>Welcome! Exclusive content here.</div>;
}

export default Community