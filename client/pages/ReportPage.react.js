import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ReactHeatmap from 'react-heatmap';
import { setFocus, pageState, getsMouseTracking, getsComment } from '../redux/actions';
import Note from '../components/testingPageComponents/notesView/Note';
{/*Note is a shared component and can be placed in a shared component place*/}

class ReportPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      reportImages : [],
      currentIndex: 0
    };
  };

  componentWillMount () {

    $(document).on('keydown', (event) => {
      if (this.props.stateRouter.pageState === 'reportView' && event.keyCode === 39) {
        if (this.state.reportImages[this.state.currentIndex + 1] !== undefined) {
          window.removeHeatmap();
          this.componentDidMount();
          var currentIndx = this.state.currentIndex;
          this.setState({ currentIndex: currentIndx + 1 });
          this.props.dispatch(setFocus('image', this.state.reportImages[this.state.currentIndex]));
          this.props.dispatch(getsMouseTracking({ imageId: this.props.currentFocus.image.id }));
          this.props.dispatch(getsComment({ imageId: this.props.currentFocus.image.id }));
        } else { //at the end of the array
          this.setState({ currentIndex: 0 });
          $(document).off('keydown');
          $(document).off('keypress');
          this.props.dispatch(setFocus('image', this.state.reportImages[this.state.currentIndex]));
          this.props.dispatch(pageState('authenticated'));
          window.removeHeatmap();
          this.props.dispatch(getsComment('clear'));
        }
      }
    });

    const findImages = {
      testId : this.props.currentFocus.test.id
    };

    $.ajax({
      url: 'http://' + window.location.hostname + ':8000/api/image',
      data: findImages,
      headers: { 'x-access-token': JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token },
      method: 'GET',
      timeout: 1000,
      success: (data, textStatus, jqXHR) => {

        this.setState({ reportImages : data });
        this.props.dispatch(setFocus('image', this.state.reportImages[0]));
        this.renderCommentsMousetracking();
      }
    })
  };

  renderCommentsMousetracking() {
    this.props.dispatch(getsMouseTracking({ imageId: this.props.currentFocus.image.id }));
    this.props.dispatch(getsComment({ imageId: this.props.currentFocus.image.id }));
  }

  componentDidMount () {
    $(document).off('keypress');

    $(window).bind('beforeunload', function(){
      if (this.props.stateRouter.pageState === 'reportView') { 
        this.setState({ currentIndex: 0 });
        this.props.dispatch(setFocus('image', this.state.reportImages[this.state.currentIndex]));
      }
    }.bind(this));


    this.props.dispatch(getsMouseTracking({ imageId: this.props.currentFocus.image.id }));

    const mouseReplay = () => {
      const replay = function (cursor, path) {
        var i = 0;
        var timeInterval;
        var length = path.length;
        var move = function () {
          var position = path[i];
          cursor.css({
            top: position.y,
            left: position.x
          });
          if (i > 1 && path[i + 1]){
            timeInterval = path[i + 1].timestamp - path[i].timestamp || 0;
          } else {
            timeInterval = 0;
          }
          i++;
          if (i === length) {
            return;
          } else {
            setTimeout(move, timeInterval);
          }
        };
        move();
      };

      let path = JSON.parse(this.props.mouseTrackings.list[0].data);
      this.props.mouseTrackings.list.forEach((cursorData) => {
        console.log('cursorData: ', cursorData);
        var cursor = '#' + cursorData.id;
        var path = JSON.parse(cursorData.data);
        replay($(cursor), path);
      });
    };

    setTimeout(mouseReplay, 1000);

    setTimeout(() => {

      window.heatdata = [];
      window.removeHeatmap();
      this.props.mouseTrackings.list.forEach(function (cursorData) {
        if (cursorData) {
          var path = JSON.parse(cursorData.data);
          path.forEach(function (datapoint) {
            var heatdataPoint = {
              x: datapoint.x,
              y: datapoint.y,
              value: 5
            };
            window.heatdata.push(heatdataPoint);
          });
        }
      });
      window.renderHeatmap();
      window.toggleHeatmap();
    }, 1500);

    $(document).keypress('h', (event) => {
      if (event.which === 8 && event.ctrlKey && this.props.stateRouter.pageState === 'reportView') {
        window.toggleHeatmap();
      }
    });

    $(document).keypress('p', (event) => {
      if (event.which === 16 && event.ctrlKey && this.props.stateRouter.pageState === 'reportView') {
        mouseReplay();
      }
    });

    $(document).keypress((event) => {
      if (event.which === 4 && event.ctrlKey) {
        this.setState({ currentIndex: 0 });
        console.log('event which: ', event.which);
        this.props.dispatch(pageState('authenticated'))
        $(document).off('keydown');
        $(document).off('keypress');
        window.removeHeatmap();
        this.props.dispatch(setFocus('image', this.state.reportImages[this.state.currentIndex]));
        this.props.dispatch(getsComment('clear'));
      }
    });
  };

  render () {
    let divStyle = {
      //background image will come from the database
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundSize: 'cover'
    };

    let createImage = (imageObj) => {
      if ( imageObj.id === this.props.currentFocus.image.id ) {
        return <img key = { imageObj.url } src = { 'data:image/jpeg;base64,' + imageObj.image } ></img>
      }
    };

    const colorObj = {};
    this.props.mouseTrackings.list.forEach(function (el) {
      var color = '#' + (function co(lor) {
        return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ?  lor : co(lor); })('');
      colorObj[el.id] = color;
    });

    let createCursor = (data) => {
      let divStyle = {
        background: colorObj[data.id]
      };
      return <div key = { data.id } id = { data.id } className = "cursor" style = { divStyle }> </div>
    };

    {/*each note is mapped to one createItem upon rendering*/}
    let createComment = function (comment) {
      return <Note key = { comment.id } x = { comment.x } y = { comment.y } commentText = { comment.commentText } commentType = { comment.commentType }/>;
    };

    return (
      <div>
        <div id = 'critiqueImage' style = { divStyle } >
          { this.state.reportImages.map(createImage) }
          { this.props.mouseTrackings.list.map(createCursor) }
          { this.props.comments.list.map(createComment) }
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return {
    mouseTrackings: state.mouseTrackings,
    comments: state.comments,
    currentFocus: state.currentFocus,
    stateRouter: state.stateRouter
  }
}

export default connect(mapStateToProps)(ReportPage);