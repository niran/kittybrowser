import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import { CryptoKittiesContractName } from '../constants/contractsConstants';

class KittyForm extends Component {
    static displayName = 'KittyForm';

    render() {
        const { crytpoKittiesContract } = this.props;
        if (!crytpoKittiesContract.initialized) return null;

        return (
            <div>asdf</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        crytpoKittiesContract: state.contracts[CryptoKittiesContractName]
    }
};

export default drizzleConnect(KittyForm, mapStateToProps);
