import React, { Component } from 'react';
import { DrizzleProvider } from "drizzle-react";
import Loading from './containers/Loading';
import Browser from './components/Browser';
import CryptoKittiesAbi from './contracts/CryptoKitties.json';
import Web3 from 'web3';
import { CryptoKittiesPublicAddress, CryptoKittiesContractName } from './constants/contractsConstants';

import './App.css';

const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

const kittyContract = new web3.eth.Contract(CryptoKittiesAbi, CryptoKittiesPublicAddress,);

const drizzleOptions = {
  contracts: [{
    contractName: CryptoKittiesContractName,
    web3Contract: kittyContract
  }]
};

export default class extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <Loading>
          <Browser />
        </Loading>
      </DrizzleProvider>
    );
  }
}
