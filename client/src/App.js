import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import Dashboard from './component/Dashboard';
import UploadAbi from '../src/artifacts/contracts/Demo.sol/Demo.json'
import Upload from './component/Upload';
import { ethers } from "ethers";


function App() {
   //fetch contract information
   const [account, setAccount] = useState("");
   const [contract, setContract] = useState(null);
   const [provider, setProvider] = useState(null);
   useEffect(() => {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
 
     const loadProvider = async () => {
       if (provider) {
         window.ethereum.on("chainChanged", () => {
           window.location.reload();
         });
 
         window.ethereum.on("accountsChanged", () => {
           window.location.reload();
         });
         await provider.send("eth_requestAccounts", []);
         const signer = provider.getSigner();
         const address = await signer.getAddress();
         console.log("user address:",address);
         setAccount(address);
         // This address will change for every hardhat node restart
         let contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
 
         const contract = new ethers.Contract(
           contractAddress,
           UploadAbi.abi,
           signer
         );
         console.log(contract);
         setContract(contract);
         setProvider(provider);
       } else {
         console.error("Metamask is not installed");
       }
     };
     provider && loadProvider();
   }, []);


  return (
    <div className="App">

         
    
        <Routes>

          <Route path='login' element={<Register />} />
          <Route path='register' element={<Login />} />

          <Route path='dashboard' element={<Dashboard />} />
          <Route path='/upload' element={<Upload />} />

        </Routes>

    </div>
  );
}

export default App;
