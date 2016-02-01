import React, { Component } from 'react';

export default class ButtonTwo extends Component {
  render () {
    var style = {
      visibility: this.props.buttonTwo ? 'visible' : 'hidden'
    }
    return (
      <button style={style} onClick={ () => this.props.clickHandler("buttonOne") }>Button Uno</button>
    )
  }
}