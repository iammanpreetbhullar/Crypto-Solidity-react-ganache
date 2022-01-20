import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import { CryptoFirst_ABI, CryptoFirst_ADDRESS } from './config'

function App() {

  const [account, setAccount] = useState();
  const [contractList, setContractList] = useState();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0]);
      const addr = '0xCe1D7DE3D9F92A3860bfAa5C942DD3ba87C4152D';
      const balance = await web3.eth.getBalance(addr)
      console.log(balance)
      const contracts = new web3.eth.Contract(CryptoFirst_ABI, CryptoFirst_ADDRESS)
      setContractList(contracts)
      const counter = await contracts.methods.count().call()
      for (var i = 1; i <= counter; i++) {
        const contact = await contracts.methods.contacts[i].call();
        setContacts((contacts) => [...contacts, contact]);
      }
    }
    load();
  }, [])

  return (
    <div className="App">
      <h1>Hello</h1>
      <p>Your account is: {account}</p>
      <ul>
        {
          Object.keys(contacts).map((contact, index) => (
            <li key={`${contacts[index].name}-${index}`}>
              <h4>{contacts[index].name}</h4>
              <span><b>Phone: </b>{contacts[index].phone}</span>
            </li>
          ))
        }
      </ul>
    </div>
  );

}

export default App;
