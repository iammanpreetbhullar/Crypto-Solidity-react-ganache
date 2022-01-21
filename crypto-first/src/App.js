import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './App.css';
import { CryptoFirst_ABI, CryptoFirst_ADDRESS } from './config'

function App() {

  const [account, setAccount] = useState();
  const [contractList, setContractList] = useState();
  const [contacts, setContacts] = useState([]);
  const [balance, setBalance] = useState()

  useEffect(() => {
    async function load() {
      const web3 = new Web3('http://localhost:7545')
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0]);
      
      const balance = await web3.eth.getBalance(accounts[0])
      setBalance(balance)
      const contracts = new web3.eth.Contract(CryptoFirst_ABI, CryptoFirst_ADDRESS)
      setContractList(contracts)      
      const counter = await contracts.methods.count().call()
      for (var i = 1; i <= counter; i++) {
        const contact = await contracts.methods.contacts(i).call();
        setContacts((contacts) => [...contacts, contact]);
      }
    }
    load();
  }, [])

  return (
    <div className="App">
      <h2>Hello</h2>     
      <ul>
        {
          Object.keys(contacts).map((contact, index) => (
            <li key={`${contacts[index].name}-${index}`}>
              <h3>{contacts[index].name}</h3>
              <span><b>Your account is: </b>{account}</span>
              <br/>
              <span><b>Phone: </b>{contacts[index].phone}</span>
              <br/>
              <span><b>Balance: </b>{balance / 10 ** 18} ETH</span>
            </li>
          ))
        }
      </ul>
    </div>
  );

}

export default App;
