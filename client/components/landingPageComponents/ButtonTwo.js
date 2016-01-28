import React, { Component } from 'react';
import { connect } from 'react-redux';
import reducer from '../../redux/reducers';
import switchVisibility from '../../redux/actions';

class ButtonTwo extends Component {
  handleClick (e) {
    console.log('ay', e)
    this.props.dispatch(switchVisibility('buttonOne'))
  }
  render() {
    var style = {
      visibility: this.props.buttonTwo ? 'visible' : 'hidden'
    }
    return (
      <button style={style} onClick={this.handleClick.bind(this)}>Button Dos</button>
    )
  }
}

function select(state){
  console.log(state.buttonOne, state.buttonTwo)
  return state
}

export default connect(select)(ButtonTwo)