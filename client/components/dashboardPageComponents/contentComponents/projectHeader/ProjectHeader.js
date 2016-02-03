import React, { Component } from 'react';
import Header from './subComponents/Header'

export default class extends Component {
  render () {
    return (
      <div>
        <h3>I am the project header component</h3>
        <Header />
      </div>
    )
  }
}