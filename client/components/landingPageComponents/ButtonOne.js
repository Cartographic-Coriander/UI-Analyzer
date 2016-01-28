import React, { Component } from 'react';
import { connect } from 'react-redux';
import reducer from '../../redux/reducers';
import switchVisibility from '../../redux/actions';

class ButtonOne extends Component {
  handleClick () {
    this.props.dispatch(switchVisibility('buttonTwo'))
  }
  render () {
    var style = {
      visibility: this.props.buttonOne ? 'visible' : 'hidden'
    }
    return (
      <button style={style} onClick={ this.handleClick.bind(this) }>Button Uno</button>
    )
  }
}

function select(state){
  return state
}

export default connect(select)(ButtonOne)