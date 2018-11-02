import React, { Component } from 'react';
import { object } from 'prop-types';
import { drizzleConnect } from 'drizzle-react';
import { CryptoKittiesContractName } from '../constants/contractsConstants';
import { Card } from 'antd';


class KittyForm extends Component {
    static displayName = 'KittyForm';

    render() {
        const { transaction } = this.props;
        // if (!transaction) return null;

        return (
            <Card title='Blah'>
                <p>Card content</p>
            </Card>
        );
    }
}

const mapStateToProps = (state, props) => {
    const txnHash = state.transactionStack && state.transactionStack[props.transactionStackId];
    return {
        transaction: txnHash && state.transactions[txnHash]
    }
};

export default drizzleConnect(KittyForm, mapStateToProps);
