import React, { Component } from 'react';
import { object } from 'prop-types';
import KittyForm from '../../containers/KittyForm/KittyForm';
import { CryptoKittiesContractName } from '../../constants/contractsConstants';

import styles from './Browser.module.scss';

class Browser extends Component {

  state = {
    dataKey: null
  }

  constructor(props, context) {
    super(props, context);
    this.drizzle = context.drizzle;
  }

  onSubmit = kittyId => {
    const KittyContract = this.drizzle.contracts[CryptoKittiesContractName];
    const dataKey = KittyContract.methods.getKitty.cacheCall(kittyId);
    this.setState({ dataKey });
  };

  render() {
    return (
      <div className={styles.browser}>
        <h1>
          Kitty Browser
        </h1>

        <KittyForm transactionDataKey={this.state.dataKey} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
