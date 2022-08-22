import { useEffect } from 'react';

import Card from './components/MetaMask-Card';


function App() {

  useEffect(()=>{

    if(!window.ethereum) return alert("Please install MetaMask !");

  },[]);

  return (
    <div className="flex justify-center items-center w-full h-screen grad-background">
      <Card/>
    </div>
  )
}

export default App
