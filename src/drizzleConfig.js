import Web3 from 'web3';
import { CryptoKittiesPublicAddress, CryptoKittiesContractName } from './constants/contractsConstants';
import CryptoKittiesAbi from './contracts/CryptoKitties.json';

const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;
const kittyContract = new web3.eth.Contract(CryptoKittiesAbi, CryptoKittiesPublicAddress);

export default {
    contracts: [{
        contractName: CryptoKittiesContractName,
        web3Contract: kittyContract
    }]
};
