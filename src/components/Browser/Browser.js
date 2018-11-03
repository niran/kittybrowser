import React, { Component } from 'react';
import { object } from 'prop-types';
import KittyForm from '../../containers/KittyForm/KittyForm';
import { CryptoKittiesContractName } from '../../constants/contractsConstants';
import { connect } from 'react-redux';
import { getKittyData } from '../../actions/kittiesActions';

import styles from './Browser.module.scss';

class Browser extends Component {

  state = {
    dataKey: null,
    kittyId: null
  }

  constructor(props, context) {
    super(props, context);
    this.drizzle = context.drizzle;
  }

  onSubmit = kittyId => {
    const KittyContract = this.drizzle.contracts[CryptoKittiesContractName];
    const dataKey = KittyContract.methods.getKitty.cacheCall(kittyId);
    if (!isNaN(kittyId)) {
      this.props.getKittyData(kittyId);
    } else {
      kittyId = null;
    }
    this.setState({ dataKey, kittyId });
  };

  render() {
    const { kittyId, dataKey } = this.state;

    return (
      <div className={styles.browser}>
        <h1>
          Kitty Browser
        </h1>

        <KittyForm transactionDataKey={dataKey} kittyId={kittyId} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default connect(null, { getKittyData })(Browser);
