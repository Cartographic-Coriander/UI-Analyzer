import React, { Component } from 'react';

export default class ButtonOne extends Component {
  render () {
    var style = {
      visibility: this.props.buttonOne ? 'visible' : 'hidden'
    }
    return (
      <button style={style} onClick={ () => this.props.clickHandler("buttonTwo") }>Button Uno</button>
    )
  }
}