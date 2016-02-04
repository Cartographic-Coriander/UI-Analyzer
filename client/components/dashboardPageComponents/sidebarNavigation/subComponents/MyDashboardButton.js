import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleContentComponent } from '../../../../redux/actions';
import { Button } from 'react-bootstrap';
import { contentState } from '../../../../redux/actions';

class MyDashboardButton extends Component {
  handleClick () {
    this.props.dispatch(contentState('Dashboard'));
  }
  render () {
    return (
      <Button className="MyDashboardButton btn-primary btn-block" onClick = { this.handleClick.bind(this) }>
        My Dashboard
      </Button>
    )
  }
}

const select = (state) => state

export default connect(select)(MyDashboardButton)