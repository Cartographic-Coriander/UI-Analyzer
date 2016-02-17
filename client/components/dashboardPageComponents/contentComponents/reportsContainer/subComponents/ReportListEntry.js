import React, { Component } from 'react';

export default class extends Component {
  getReportDetailForImage () {
    const params = {
      imageId: image.id
    };

    this.props.reportDetails(params);
  };

  render () {
    return (
      <div>
      
      </div>
    )
  }
}
