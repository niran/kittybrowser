import React, { Component } from 'react';
import { object } from 'prop-types';
import KittyForm from '../containers/KittyForm';

class Browser extends Component {

  onSubmit = kittyId => {
    alert(kittyId);
  };

  render() {
    return (
      <div className="browser">
        <h1>
          Kitty Browser
        </h1>

        <KittyForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
