import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from '../components/testingPageComponents/notesView/Note';

let fakeState = [
  {
    x: 100,
    y: 100,
    commentType: 'test comment type 1',  
    commentText: 'test comment text 1'
  },{
    x: 400,
    y: 400,
    commentType: 'test comment type 2',
    commentText: 'test comment text 2'
  },{
    x: 700,
    y: 700,
    commentType: 'test comment type 3',
    commentText: 'test comment text 3'
  },{
    x: 800,
    y: 800,
    commentType: 'test comment type 3',
    commentText: 'test comment text 4'
  }
];


const allMessages = fakeState.map((comment) => {
  return <Note key={ comment.commentText } x={ comment.x } y={ comment.y } commentText={ comment.commentText } commentType={ comment.commentType } />
});


var divStyle = {
  backgroundImage: 'url(http://orig04.deviantart.net/4055/f/2015/040/b/6/rebel_symbol_wallpaper_at_1920x1080_by_chris_alvarez-d8hf47u.jpg)',
  height: 1000,
  position: 'relative'
};
//find out how to use css to set the image size to original size

//to get moust positions on click
function findMousePosAndAddInput(e) {
    var cursorX = e.pageX;
    var cursorY = e.pageY;
    var critiqueImage = document.getElementById('critiqueImage');
    if (cursorY < critiqueImage.clientHeight && cursorX < critiqueImage.clientWidth) {
      //click must be within image boundry
      if(document.getElementById('inputText') === null) {
        //create input box where the click happened if there is no other input box on screen
        var text = document.createElement('div');
        text.style.top=cursorY+"px";
        text.style.left=cursorX+"px";
        text.style.position="absolute";
        text.innerHTML = "<input id='inputText' type='text' /><button id='leaveCommentButton' type='button'>send</button>";
        document.getElementById('critiqueImage').appendChild(text);
        document.getElementById('inputText').focus();
        //this can be broken out to be more modular may be a little confusing here
        $('#leaveCommentButton').on('click', function () {
          var critique = $('#inputText').val();
          alert(critique);
        })
      }
    }
}

document.addEventListener("click", findMousePosAndAddInput);


class AddNotes extends Component {

  render() {
    return (
      <div id='critiqueImage' style={divStyle}>      
        {allMessages}
      </div>
      )
  }

}

export default AddNotes;