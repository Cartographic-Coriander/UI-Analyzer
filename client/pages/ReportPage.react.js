import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFocus, pageState } from '../redux/actions';

class ReportPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      reportImages : [],
      currentIndex: 0
    }
  }

  componentWillMount () {
    $(document).on('keydown', function (event) {
      if (this.props.stateRouter.pageState === 'reportView') {
        console.log('check to see we are on review page', this)
        //this is the right arrow key
        if (event.keyCode === 39){
          if (this.state.reportImages[this.state.currentIndex + 1] !== undefined){
            var currentInx = this.state.currentIndex;
            this.setState({ currentIndex: currentInx + 1 });
            this.props.dispatch(setFocus('image', this.state.reportImages[this.state.currentIndex]));
            this.setState({ comments: [] });
          } else { //at the end of the array
            this.setState({ comments: [] });
            this.setState({ currentIndex: 0 });
            this.props.dispatch(pageState('authenticated'));
            $(document).off('keydown');
          }
        }
      }
    }.bind(this));

    $(document).keypress('d', function (event) {
      if (event.ctrlKey) {
        this.props.dispatch(pageState('authenticated'))
      }
      $(document).off('keydown');
      $(document).off('keypress');
    }.bind(this));

    const findImages = {
      testId : this.props.currentFocus.test.id
    }

    $.ajax({
      url: 'http://localhost:8000/api/image',
      data: findImages,
      headers: { 'x-access-token': JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token },
      method: 'GET',
      timeout: 1000,
      success: function (data, textStatus, jqXHR) {
        // this.state.reportImages = data;
        this.setState({ reportImages : data });
        this.props.dispatch(setFocus('image', this.state.reportImages[0]));
      }.bind(this)
    })
  }


  render () {
    let divStyle = {
      //background image will come from the database
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundSize: 'cover'
    };

    let createImage = function (imageObj) {
      if ( imageObj.id === this.props.currentFocus.image.id ) {
        return <img key = { imageObj.url } src = {'data:image/jpeg;base64,' + imageObj.image } ></img>
      }
    }.bind(this);

    return (
      <div>
        <div id = 'critiqueImage' style = { divStyle } >
          { this.state.reportImages.map(createImage) }
        </div>
      </div>
    )


  }

}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ReportPage);