import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditSettingsContainer from './subComponents/EditSettingsContainer';

class SettingsContainer extends Component {
  render () {
    var className = () => this.props.buttonReducer.visibleContentComponent === 'Settings' ? 'Settings' : 'hide';
    return (
      <div className = { className() }>
        <h3>I am the settings container component</h3>
        <EditSettingsContainer />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(SettingsContainer)
