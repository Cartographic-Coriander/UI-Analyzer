import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletesMouseTracking, deletesComment, getsComment, getsMouseTracking, setFocus, pageState } from '../../../../redux/actions';
import ReportListEntry from './subComponents/ReportListEntry';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ReportsContainer extends Component {

  deleteReport (report) {
    this.props.dispatch(deletesMouseTracking(report));
    this.props.dispatch(deletesComment(report));
  };

  getReportDetails (image) {
    this.props.dispatch(getsComment(image));
    this.props.dispatch(getsMouseTracking(image));
    this.props.dispatch(pageState('report_view'));
  };

  render () {
    return (
      <div className = "Reports">
        <div>
          { this.props.images.list.map((report, index) => {
              console.log(index)
              return <ReportListEntry
                delete = { this.deleteReport.bind(this) }
                reportDetails = { this.getReportDetails.bind(this) }
                key = { report.id }
                index = { index }
                image = { report.image }
                id = { report.id }
                projectId = { report.projectId }
                url = { report.url }
              />
            })
          }
        </div>
      </div>
    );
  };
}

const select = (state) => state

export default connect(select)(ReportsContainer)

