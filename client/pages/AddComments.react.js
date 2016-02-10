import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from '../components/testingPageComponents/notesView/Note';
import { postsComment, getsImage, pageState, setFocus } from '../redux/actions';

class AddNotes extends Component {

  constructor (props) {
    super(props);
    this.state = {
      comments: [],
      testImages : [],
      currentIndex: 0
    }
  }

  handleSendingNotes () {
    console.log('-->',this.state.comments)
    //because the button also returns the user to the dashboard page
    this.props.dispatch(pageState('authenticated'));
    //for sending array of notes to the server
    this.props.dispatch(postsComment(this.state.comments));
  }

  componentWillMount () {

    $(document).on('keydown', function (event) {
      // console.log(event);
      console.log(this)
      //this is the right arrow key
      if (event.keyCode === 39) {
        if(this.state.testImages[this.state.currentIndex+1] !== undefined){
          var currentInx = this.state.currentIndex;
          this.setState({ currentIndex: currentInx+1 });
          this.props.dispatch(setFocus('image', this.state.testImages[this.state.currentIndex]));

        } else {

        }
      } else if (event.keyCode === 37) {
        //left arrow key
        if(this.state.testImages[this.state.currentIndex-1] !== undefined){
          var currentInx = this.state.currentIndex;
          this.setState({ currentIndex: currentInx-1 });
          this.props.dispatch(setFocus('image', this.state.testImages[this.state.currentIndex]));
        } else {

        }
      }
    }.bind(this));

    $(document).keypress('d', function (event) {
      if (event.ctrlKey) {
        this.handleSendingNotes();
      }
    }.bind(this));

    const findImage = {
      testId : this.props.currentFocus.test.id
    }

    setTimeout( () => {
      $.ajax({
        url: 'http://localhost:8000/api/image',
        data: findImage,
        headers: { 'x-access-token': JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token },
        method: 'GET',
        timeout: 50000,
        success: function (data, textStatus, jqXHR) {
          // this.state.testImages = data;
          this.setState({ testImages : data });
          let firstImage = this.state.testImages[0];
          this.props.dispatch(setFocus('image', { id: firstImage.id, image: firstImage.image, testID: firstImage.testId, url: firstImage.url }));
        }.bind(this)
      })

    } , 50);

  }

  //this is the click handler that runs when the image to critique is clicked on
  findMousePosAndAddInput(event) {
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
        text.innerHTML = "<input id='radio1' type='radio' name='sentiment' value='positive'><span></span>" +
                            "<label for='radio1'>YAY</label>" +
                          "<input id='radio2' type='radio' name='sentiment' value='negative'><p id='invisibleP'></p>" +
                            "<label for='radio2'>NAY</label></br>" +
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
          }
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

    // //initiating keyboard event to dispatch actions to go back to the landing page
    // $(document).keypress('d', function () {

    //   // this.handleSendingNotes();
    // }.bind(this));

    let divStyle = {
      //background image will come from the database
      background: 'url(' + this.props.images + ')',
      position: 'relative',
      height: '100vh',
      backgroundSize: 'cover'
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
        <div id = 'critiqueImage' style = {divStyle} onClick = {this.findMousePosAndAddInput.bind(this)}>
          {/*mapping and rendering out array of comments*/}
          { this.state.comments.map(createItem) }
          { this.state.testImages.map(createImage) }
       </div>
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