import React, { Component, Children, Fragment } from 'react';
import { drizzleConnect } from 'drizzle-react';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import { Alert} from 'antd';
import styles from './Loading.module.scss';

class Loading extends Component {
  static displayName = 'Loading';

  render() {
    const { drizzleStatus, children, web3Status } = this.props;

    if (window.web3 === undefined || web3Status === 'failed') {
      return (
        // Display a web3 warning.
        <div className={styles.loadingContainer}>
          <Alert
            className={styles.alert}
            message="Warning"
            description={<span>
              This browser has no connection to the Ethereum network.<br />
              Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.
            </span>}
            type="warning"
          />
        </div>
      );
    }

    if (drizzleStatus.initialized) {
      // Load the dapp.
      return Children.only(React.cloneElement(children));
    }

    // Display a loading indicator.
    return (
      <Fragment>
        <h1 className={styles.loadingText}>Loading dapp...</h1>
        <div className={styles.loadingContainer}>
          <LoadingIndicator />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3Status: state.web3.status,
    drizzleStatus: state.drizzleStatus
  }
};

export default drizzleConnect(Loading, mapStateToProps);
