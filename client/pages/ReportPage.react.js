import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getsMouseTracking, getsComment, resetsComment } from '../redux/actions';
import Comment from '../components/addCommentsPageComponents/commentView/Comment';
import ReportSplash from '../components/reportPageComponents/ReportSplash';

class ReportPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      testImages : [],
      currentIndex: 0,
      showLanding: true,
      delay: 5750
    };
  };

  endReport () {
    window.removeHeatmap();
    this.props.dispatch(resetsComment());
    $(document).off('keydown');
    browserHistory.push('/dashboard');
  };

  componentWillMount () {
    setTimeout(() => {
      this.setState({ showLanding: false });
    }, 5000);

    $.ajax({
      url: '/api/image',
      data: {
        testId : this.props.params.testId
      },
      headers: { 'x-access-token': JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token },
      method: 'GET',
      timeout: 1000,
      success: (data) => {
        this.setState({ testImages: data }, this.getCommentsMousetracking);
        this.getCommentsMousetracking();
      }
    })
  };

  getCommentsMousetracking () {
    this.props.dispatch(getsMouseTracking({ imageId: this.state.testImages[this.state.currentIndex].id }));
    this.props.dispatch(getsComment({ imageId: this.state.testImages[this.state.currentIndex].id }));
    this.mouseReplay();
  };

  mouseReplay () {
    $(document).off('keydown');

    const mouseReplay = () => {
      const replay = (cursor, path) => {
        var i = 0;
        var timeInterval;
        var length = path.length;

        var move = () => {
          var position = path[i];

          cursor.css({
            top: position.y,
            left: position.x
          });

          if (i > 1 && path[i + 1]) {
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
        var cursor = '#' + cursorData.id;
        var path = JSON.parse(cursorData.data);
        replay($(cursor), path);
      });
    };

    setTimeout(mouseReplay, this.state.delay);

    setTimeout(() => {
      window.heatdata = [];
      window.removeHeatmap();

      this.props.mouseTrackings.list.forEach((cursorData) => {
        if (cursorData) {
          var path = JSON.parse(cursorData.data);

          path.forEach((datapoint) => {
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
    }, this.state.delay);
    var flag = true;

    $(document).on('keydown', (event) => {
      if (event.keyCode === 72 && event.ctrlKey) {
        window.toggleHeatmap();
        console.log(window.heatmapVisible)
      }
    });

    $(document).on('keydown', (event) => {
      if (event.keyCode === 82 && event.ctrlKey) {
        mouseReplay();
      }
    });

    $(document).on('keydown', (event) => {
      if (event.keyCode === 68 && event.ctrlKey) {
        this.endReport();
      }
    });

    $(document).on('keydown', (event) => {
      if (event.keyCode === 39) {
        if (this.state.testImages[this.state.currentIndex + 1] !== undefined) {
          window.removeHeatmap();
          // this.mouseReplay();
          this.setState(prev => ({ currentIndex: prev.currentIndex + 1 }));
          this.getCommentsMousetracking();
        } else {
          this.endReport();
        }
      }
    });

    this.setState({ delay: 750 });
  };

  render () {
    // Test image will come from the server
    let imageStyle = {
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundSize: 'cover'
    };

    let renderImage = (imageObj) => {
      if ( imageObj.id === this.state.testImages[this.state.currentIndex].id ) {
        return <img key = { imageObj.url } src = { 'data:image/jpeg;base64,' + imageObj.image } ></img>;
      }
    };

    let renderCursor = (data) => {
      const colorObj = {};

      this.props.mouseTrackings.list.forEach(function (item) {
        var color = '#' + (function co(lor) {
          return (lor += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random() * 16)]) && (lor.length == 6) ?  lor : co(lor); 
        })('');

        colorObj[item.id] = color;
      });

      let cursorColor = { background: colorObj[data.id] };

      return <div key = { data.id } id = { data.id } className = "cursor" style = { cursorColor }> </div>
    };

    // Each note is mapped to one createItem upon rendering
    let renderComment = (comment) => {
      return <Comment key = { comment.id } x = { comment.x } y = { comment.y } commentText = { comment.commentText } commentType = { comment.commentType }/>;
    };

    return (
      <div>
        { (() => {
          if (this.state.showLanding) {
            return (
              <ReportSplash />
            );
          } else {
            return (
              <div id = 'critiqueImage' style = { imageStyle } >
                { this.state.testImages.map(renderImage) }
                { this.props.mouseTrackings.list.map(renderCursor) }
                { this.props.comments.list.map(renderComment) }
              </div>
            );
          }
        })() }
      </div>
    );
  };
}

const select = (state) => ({
  mouseTrackings: state.mouseTrackings,
  comments: state.comments
});

export default connect(select)(ReportPage);