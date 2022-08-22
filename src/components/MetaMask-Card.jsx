import { useEffect, useState } from "react";

import { ethers } from 'ethers';

import Fox from "../assets/metamask.png";

import { shortenAddress } from '../utils/shortenAddress';


const { ethereum } = window;


const Card = () => {



    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(0);


    const setUserBalance = async (address) => {

        const _balance = await ethereum.request({method: "eth_getBalance", params: [address, "latest"]});

        return setBalance(ethers.utils.formatEther(_balance));
    }

    const setUserAccount = (account) => {

        return setAccount(shortenAddress(account));
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    const accountChangedHandler = () => {
        window.location.reload();
    }

    const connectWallet = async () => {

        try {

            if(!ethereum) return alert("Please install MetaMask !");

            const accounts = await ethereum.request({

                method: "eth_requestAccounts"
            });


             setUserAccount(accounts[0]);

             setUserBalance(accounts[0]);

             window.location.reload();

            
        } catch (error) {
            
            console.log(error);
            throw new Error("No ethereum object !");
        }
    };


    const checkWalletConnection = async () => {

        try {


            if(!ethereum) return alert("Please install metamask !");
            
            
            const accounts = await ethereum.request({method:"eth_accounts"});



            if(accounts.length) {
                setUserAccount(accounts[0]);
                
                setUserBalance(accounts[0]);
                
            }
            
            else{
                console.log("No accounts found.");
            }
            
        } catch (error) {
            console.log(error);
           
        }
    }

    if(ethereum){
        ethereum.on("accountsChanged", accountChangedHandler);

        ethereum.on("chainChanged", chainChangedHandler)
    }

    


    useEffect(()=>{
        
        checkWalletConnection();
    },[])

    return (
        <div className="flex flex-col justify-around items-center glassmorphism w-1/2 h-3/4">
            <div>
            <img src={Fox} alt="logo" className="w-24 animate-bounce -mt-8"/> 
            </div>
            <div>
            <p className="text-lg lg:text-2xl font-bold font-mono text-white text-gradient">Address</p>
            <p className="text-3xl lg:text-6xl font-mono font-light address-gradient">{account? account: "Address"}</p>
            </div>
<div className="h-[1px] w-full bg-gray-400 "/> 
            <div>
            <p className="text-md lg:text-2xl font-bold font-mono text-white text-gradient">Balance</p>
            <div>
                <div className="flex items-center gap-6">
                    <p className={balance.toString().split('.')[0].length>4?"text-lg lg:text-2xl font-bold address-gradient":"text-3xl lg:text-9xl font-bold address-gradient px-10"}>{balance? balance.toString().split('.')[0]:"0"}</p>
                    <p className="text-xl lg:text-5xl font-semibold font-mono text-white self-end">ETH</p>
                </div>
            </div>
            </div>

            {!account && (
                <button className="w-56 h-16 rounded-md bg-blue-400 border-none text-white hover:scale-125" 
            
                onClick={connectWallet}
    
                ><span className="text-2xl font-bold font-mono" >Connect Wallet</span></button>
            )}
        </div>
    )
}

export default Card;