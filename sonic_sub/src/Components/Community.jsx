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

   
     
  return (
    <div>Community</div>
  )
}

export default Community