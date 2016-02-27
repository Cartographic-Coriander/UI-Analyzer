import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { postsComment, getsImage, pageState, setFocus } from '../redux/actions';
import Comment from '../components/addCommentsPageComponents/commentView/Comment';
import AddCommentsSplash from '../components/addCommentsPageComponents/AddCommentsSplash';

class AddCommentsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: [],
      testImages : [],
      currentIndex: 0,
      showLanding: true
    };
  };

  endAddComments () {
    this.handlePostComments();
    $(document).off('keypress');
    browserHistory.push('/dashboard');
  };

  // Post array of notes to the server
  handlePostComments () {
    this.props.dispatch(postsComment(this.state.comments));
    this.setState({ comments: [] });
  };

  componentWillMount () {
    // Display feedback prompt for six seconds
    setTimeout(() => {
      this.setState({ showLanding: false });
    }, 5000);

    $(document).on('keydown', (event) => {
      // This is the key code for the right arrow key
      if (event.keyCode === 39){
        if (this.state.testImages[this.state.currentIndex + 1] !== undefined) {
          this.setState(prev => ({ currentIndex: prev.currentIndex + 1 }));
          this.handlePostComments();
        } else {
          this.endAddComments();
        }
      }
    });

    $(document).keypress('d', (event) => {
      if (event.ctrlKey) {
        this.endAddComments();
      }
    });

    $.ajax({
      url: '/api/image',
      data: {
        testId : this.props.params.testId
      },
      headers: { 'x-access-token': JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token },
      method: 'GET',
      timeout: 10000,
      success: (data) => {
        this.setState({ testImages : data });
      }
    })
  };

  // This is the click handler that runs when the image to critique is clicked on
  findMousePosAndAddInput (event) {
    // Check to see that the click occurs within the image displayed
    let cursorX = event.pageX;
    let cursorY = event.pageY;

    // The offset is there so that critiqueImage can be found no matter where it loads on the page, it is used in the logic below
    let offset = $('#critiqueImage').offset();
    let critiqueImage = document.getElementById('critiqueImage');

    if (cursorY < critiqueImage.clientHeight + offset.top && cursorX < critiqueImage.clientWidth + offset.left) {

      // Only render radio and input fields if they do not already exist
      if (document.getElementById('inputText') === null) {

        // Create the div that will be appended over the image and set it's intial values
        let text = document.createElement('div');
        text.style.top = cursorY - offset.top + "px";
        text.style.left = cursorX - offset.left + "px";
        text.style.position = "absolute";
        text.className = "feedbackContainer";
        text.innerHTML = "<input id='radio1' type='radio' name='sentiment' value='positive'><span></span>" +
                            "<label id='radioLabel' for='radio1'>Like</label>" +
                          "<input id='radio2' type='radio' name='sentiment' value='negative'><p id='invisibleP'></p>" +
                            "<label id='radioLabel' for='radio2'>Dislike</label></br>" +
                          "<input id='inputText' type='text' />" +
                            "<button id='leaveCommentButton' type='button'>send</button>";

        document.getElementById('critiqueImage').appendChild(text);
        document.getElementById('inputText').focus();

        // Attach a function to be run whenever the input button is clicked
        $('#leaveCommentButton').on('click', () => {

          // Grab the values from the input field / radio field
          let critique = $('#inputText').val();
          let commentType = $('input[name=sentiment]:checked').val();

          // Create a new object per server API requirements
          let newComment = {
            x: cursorX - offset.left,
            y: cursorY - offset.top,
            commentText: critique,
            commentType: commentType,
            imageId: this.state.testImages[this.state.currentIndex].id,
            id: this.state.comments.length
          };

          let comments = this.state.comments;
          if (newComment.commentText !== "") {
            comments.push(newComment);
          }

          // Add a new comment to image
          setTimeout(() => { $('#critiqueImage').children().last().remove() }, 5);
          this.setState({ comments: comments });
        });
      }
    }
  }

  render () {
    // Test image will come from the server
    let imageStyle = {
      position: 'relative',
      height: '100%',
      width: '100%'
    };

    // Each note is mapped to one createItem upon rendering
    let renderComment = (comment) => {
      return <Comment key = { comment.id } x = { comment.x } y = { comment.y } commentText = { comment.commentText } commentType = { comment.commentType }/>;
    };

    // Display only one image at a time
    let renderImage = (imageObj) => {
      if ( imageObj.id === this.state.testImages[this.state.currentIndex].id ) {
        return <img key = { imageObj.url } src = {'data:image/jpeg;base64,' + imageObj.image } ></img>;
      }
    };

    return (
      <div>
        { (() => {
          if (this.state.showLanding) {
            return (
              <AddCommentsSplash />
            )
          } else {
            return (
              <div id = 'critiqueImage' style = { imageStyle } onClick = { this.findMousePosAndAddInput.bind(this) }>
                {/* Mapping and rendering out array of comments */}
                { this.state.comments.map(renderComment) }
                { this.state.testImages.map(renderImage) }
             </div>
            )
          }
        })() }
      </div>
    );
  }
}

const select = (state) => ({
  comments: state.comments.list
});

export default connect(select)(AddCommentsPage);
