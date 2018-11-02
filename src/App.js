import React, { Component } from 'react';
import { DrizzleProvider } from "drizzle-react";
import Loading from './containers/Loading/Loading';
import Browser from './components/Browser/Browser';
import store from './createStore';
import drizzleOptions from './drizzleConfig';

import './App.css';

export default class extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions} store={store}>
        <Loading>
          <Browser />
        </Loading>
      </DrizzleProvider>
    );
  }
}
