import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from '../components/testingPageComponents/notesView/Note';
import addNote from '../redux/notesAction';

class AddNotes extends Component {

    findMousePosAndAddInput(event) {
      {/*checking to see that the click occurs within the image displayed*/}
      let cursorX = event.pageX;
      let cursorY = event.pageY;
      {/*the offset is there so that critiqueImage can be found no matter where it loads on the page, it is used in the logic below*/}
      let offset = $('#critiqueImage').offset();
      let critiqueImage = document.getElementById('critiqueImage');
      if (cursorY < critiqueImage.clientHeight+offset.top && cursorX < critiqueImage.clientWidth+offset.left) {
        {/*only render radio and input fields if they do not already exist*/}     
        if(document.getElementById('inputText') === null) {
          {/*create the div that will be appended over the image and set it's intial values*/}
          let text = document.createElement('div');
          text.style.top=cursorY-offset.top+"px";
          text.style.left=cursorX-offset.left+"px";
          text.style.position="absolute";
          text.innerHTML = "<input type='radio' name='sentiment' value='yay'>yay</br><input type='radio' name='sentiment' value='nay'>nay</br><input id='inputText' type='text' /><button id='leaveCommentButton' type='button'>send</button>";
          document.getElementById('critiqueImage').appendChild(text);
          document.getElementById('inputText').focus();
          {/*need to attach a function to be run whenever the input button is clicked*/}
          $('#leaveCommentButton').on('click', function () {
            {/*grab the values from the input field / radio field*/}
            let critique = $('#inputText').val();
            let commentType = $('input[name=sentiment]:checked').val();
            {/*creates a new object per model specs*/}
            let newCritiqueObj = {
              x: cursorX-offset.left,
              y: cursorY-offset.top,
              commentText: critique,
              commentType: commentType
            }
            console.log(newCritiqueObj);
            this.props.dispatch(addNote(newCritiqueObj));
            {/*TODO THERE HAS TO BE A BETTER WAY THAN SETTIMEOUT. RIGHT NOW, CLICK ON BUTTON REGISTERS AS NEW CLICK NEW INPUT FIELD IS ADDED*/}
            setTimeout(()=>{$('#critiqueImage').children().last().remove()},5);
            {/*END TODO*/}
          }.bind(this))
        }
      }
  }

  render(){ 
    let divStyle = {
      background: 'url(http://orig04.deviantart.net/4055/f/2015/040/b/6/rebel_symbol_wallpaper_at_1920x1080_by_chris_alvarez-d8hf47u.jpg)',
      position: 'relative',
      height: '100vh',
      backgroundSize: 'cover'
    };

    let createItem = function (comment) {
      return <Note key={ comment.commentText } x={ comment.x } y={ comment.y } commentText={ comment.commentText } commentType={ comment.commentType } />;
    };
    return <div id='critiqueImage' style={divStyle} onClick={this.findMousePosAndAddInput.bind(this)}>
      {/*when hooked up to redux, the line below will be changing via props*/}
      {this.props.notes.map(createItem)}
    </div>;
  }

}

/*//////////////////////////////////////////////////////////////////////////////////////////////////////////////
I believe the commented out setup below will work for getting notes data from DB every time mapStatToProps is called
just replace current mapStateToProps with the commented out one below 
---for testing with DB---
this also means that critique commment object above should be sent to the database, too :)  (not written yet)

function getNotes(dispatch) {
  $.ajax({
    method: 'GET',
    url: 'INSERT URL FOR GETTING NOTES HERE',
    dataType: 'json'
  }).success(function (data) {
    return dispatch({
      type: 'ADD_NOTE',
      note: data
    })
  })
}

function mapStateToProps(dispatch) {
  return {
    notes : () => getNotes(dispatch)
  };
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

function mapStateToProps(state) {
  return {notes: state.notes}
}

export default connect(mapStateToProps)(AddNotes);