import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from '../components/testingPageComponents/notesView/Note';
import { postsComment, getsImage, pageState, setFocus } from '../redux/actions';
import Welcome from '../components/testingPageComponents/welcomeToComments.js';

class AddNotes extends Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: [],
      testImages : [],
      currentIndex: 0,
      showLanding: true
    }
  }

  handleSendingNotes () {
    //because the button also returns the user to the dashboard page
    this.props.dispatch(pageState('authenticated'));
    //for sending array of notes to the server
    this.props.dispatch(postsComment(this.state.comments));
  }

  componentWillMount () {
    //show feedback prompt for six seconds
    setTimeout(() => {
      this.setState({ showLanding: false });
    }, 5000);

    $(document).on('keydown', function (event) {
      //this is the right arrow key
      if (event.keyCode === 39){
        if (this.state.testImages[this.state.currentIndex + 1] !== undefined){
          var currentInx = this.state.currentIndex;
          this.setState({ currentIndex: currentInx + 1 });
          this.props.dispatch(setFocus('image', this.state.testImages[this.state.currentIndex]));
          this.props.dispatch(postsComment(this.state.comments));
          this.setState({ comments: [] });
        } else { //at the end of the array
          this.props.dispatch(postsComment(this.state.comments));
          this.setState({ comments: [] });
          $(document).off('keydown');
          this.props.dispatch(pageState('authenticated'));
        }
      }
    }.bind(this));

    $(document).keypress('d', function (event) {
      if (event.ctrlKey) {
        this.handleSendingNotes();
        $(document).off('keypress');
      }
    }.bind(this));

    const findImage = {
      testId : this.props.currentFocus.test.id
    }

    $.ajax({
      url: 'http://' + process.env.IP_ADDRESS + ':8000/api/image',
      data: findImage,
      headers: { 'x-access-token': JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token },
      method: 'GET',
      timeout: 5000,
      success: function (data, textStatus, jqXHR) {
        // this.state.testImages = data;
        this.setState({ testImages : data });
        let firstImage = this.state.testImages[0];
        this.props.dispatch(setFocus('image', { id: firstImage.id, image: firstImage.image, testID: firstImage.testId, url: firstImage.url }));
      }.bind(this)
    })
  }

  //this is the click handler that runs when the image to critique is clicked on
  findMousePosAndAddInput (event) {
    {/*checking to see that the click occurs within the image displayed*/}
    let cursorX = event.pageX;
    let cursorY = event.pageY;
    {/*the offset is there so that critiqueImage can be found no matter where it loads on the page, it is used in the logic below*/}
    let offset = $('#critiqueImage').offset();
    let critiqueImage = document.getElementById('critiqueImage');
    if (cursorY < critiqueImage.clientHeight + offset.top && cursorX < critiqueImage.clientWidth + offset.left) {
      {/*only render radio and input fields if they do not already exist*/}
      if (document.getElementById('inputText') === null) {
        {/*create the div that will be appended over the image and set it's intial values*/}
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
        {/*need to attach a function to be run whenever the input button is clicked*/}
        $('#leaveCommentButton').on('click', function () {
          {/*grab the values from the input field / radio field*/}
          let critique = $('#inputText').val();
          let commentType = $('input[name=sentiment]:checked').val();
          {/*creates a new object per model specs*/}
          let newComment = {
            x: cursorX - offset.left,
            y: cursorY - offset.top,
            commentText: critique,
            commentType: commentType,
            imageId: this.props.currentFocus.image.id,
            id: this.state.comments.length
          };
          let comments = this.state.comments;
          if (newComment.commentText !== "") {
            comments.push(newComment);
          }
          {/*adding new comment to image*/}
          {/*TODO THERE HAS TO BE A BETTER WAY THAN SETTIMEOUT. RIGHT NOW, CLICK ON BUTTON REGISTERS AS NEW CLICK NEW INPUT FIELD IS ADDED*/}
          setTimeout(() => { $('#critiqueImage').children().last().remove() }, 5);
          {/*END TODO*/}
          this.setState({ comments: comments });
        }.bind(this))
      }
    }
  }

  render () {
    let divStyle = {
      //background image will come from the database
      position: 'relative',
      height: '100%',
      width: '100%'
    };

    {/*each note is mapped to one createItem upon rendering*/}
    let createItem = function (comment) {
      return <Note key = { comment.id } x = { comment.x } y = { comment.y } commentText = { comment.commentText } commentType = { comment.commentType }/>;
    };
    {/*we do not want to show every image at once*/}
    let createImage = function (imageObj) {
      // console.log(imageObj, this);
      if ( imageObj.id === this.props.currentFocus.image.id ) {
        return <img key = { imageObj.url } src = {'data:image/jpeg;base64,' + imageObj.image } ></img>
      }
    }.bind(this);
    return (
      <div>
        { (() => {
          if (this.state.showLanding) {
            return (
              <Welcome />
            )
          } else {
            return (
              <div id = 'critiqueImage' style = { divStyle } onClick = { this.findMousePosAndAddInput.bind(this) }>
                {/*mapping and rendering out array of comments*/}
                { this.state.comments.map(createItem) }
                { this.state.testImages.map(createImage) }
             </div>
            )
          }
        })() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments.list,
    image: state.images,
    currentFocus: state.currentFocus
  }
}

export default connect(mapStateToProps)(AddNotes);