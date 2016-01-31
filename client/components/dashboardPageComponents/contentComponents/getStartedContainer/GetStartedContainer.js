import React, { Component } from 'react';
import { connect } from 'react-redux';
import EgansSexyVoice from './subComponents/EgansSexyVoice';

class GetStartedContainer extends Component {
  render () {
    return (
      <div className = 'GetStarted'>
        <h3>I am the registration component</h3>
        <EgansSexyVoice />
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(GetStartedContainer)
