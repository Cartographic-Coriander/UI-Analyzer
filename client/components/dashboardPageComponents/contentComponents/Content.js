import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProjectHeader from './projectHeader/ProjectHeader';
import SettingsContainer from './settingsContainer/SettingsContainer';
import TestContainer from './testContainer/TestContainer';
import DashboardDefault from './dashboardContainer/DashboardContainer'

class Content extends Component {
  render () {
    return (
      <div>
        { this.props.children || <DashboardDefault /> }
      </div>
    )
  }
}

const select = (state) => state

export default connect(select)(Content)