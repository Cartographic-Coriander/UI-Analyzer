import React, { Component } from 'react';
import { connect } from 'react-redux';
import Note from '../components/testingPageComponents/notesView/Note';
import switchVisibility from '../redux/actions';

let fakeState = [
  {
    x: 100,
    y: 100,
    commentType: 'test comment type 1',  
    commentText: 'test comment text 1'
  },{
    x: 200,
    y: 200,
    commentType: 'test comment type 2',
    commentText: 'test comment text 2'
  },{
    x: 300,
    y: 300,
    commentType: 'test comment type 3',
    commentText: 'test comment text 3'
  }
];

// const allMessages = fakeState.map((comment) => {
//   return <Note key={ comment.commentText } x={ comment.x } y={ comment.y } commentText={ comment.commentText } commentType={ comment.commentType } />
// });

var divStyle = {
  background: 'url(http://orig04.deviantart.net/4055/f/2015/040/b/6/rebel_symbol_wallpaper_at_1920x1080_by_chris_alvarez-d8hf47u.jpg)',
  position: 'relative',
  height: '100vh',
  backgroundSize: 'cover'
};

class AddNotes extends Component {

    findMousePosAndAddInput(event) {
      {/*checking to see that the click occurs within the image displayed*/}
      let cursorX = event.pageX;
      let cursorY = event.pageY;
      let critiqueImage = document.getElementById('critiqueImage');
      if (cursorY < critiqueImage.clientHeight && cursorX < critiqueImage.clientWidth) {
        {/*only render radio and input fields if they do not already exist*/}     
        if(document.getElementById('inputText') === null) {
          {/*create the div that will be appended over the image and set it's intial values*/}
          let text = document.createElement('div');
          text.style.top=cursorY+"px";
          text.style.left=cursorX+"px";
          text.style.position="absolute";
          text.innerHTML = "<input type='radio' name='sentiment' value='yay'>yay</br><input type='radio' name='sentiment' value='nay'>nay</br><input id='inputText' type='text' /><button id='leaveCommentButton' type='button'>send</button>";
          document.getElementById('critiqueImage').appendChild(text);
          document.getElementById('inputText').focus();
          {/*need to attach a function to be run whenever the input button is clicked*/}
          $('#leaveCommentButton').on('click', function () {
            {/*grab the values from the input field / radio field*/}
            let critique = $('#inputText').val();
            let xCoordCritique = $('#inputText').parent().css('left').match(/\d/g).join('');
            let yCoordCritique = $('#inputText').parent().css('top').match(/\d/g).join('');
            let commentType = $('input[name=sentiment]:checked').val();
            {/*create a new object per model specs*/}
            let newCritiqueObj = {
              x: xCoordCritique,
              y: yCoordCritique,
              commentText: critique,
              commentType: commentType
            }
            console.log(newCritiqueObj);
            this.props.dispatch(switchVisibility('not buttons'));
            {/*TODO THERE HAS TO BE A BETTER WAY THAN SETTIMEOUT. RIGHT NOW, CLICK ON BUTTON REGISTERS AS NEW CLICK NEW INPUT FIELD IS ADDED*/}
            setTimeout(()=>{$('#critiqueImage').children().last().remove()},5);
            {/*END TODO*/}
          }.bind(this))
        }
      }
  }

  render(){ 
    var createItem = function (comment) {
      return <Note key={ comment.commentText } x={ comment.x } y={ comment.y } commentText={ comment.commentText } commentType={ comment.commentType } />;
    };
    return <div id='critiqueImage' style={divStyle} onClick={this.findMousePosAndAddInput.bind(this)}>
      {/*when hooked up to redux, the line below will be changing via props*/}
      {fakeState.map(createItem)}
    </div>;
  }

}

function mapStateToProps(state) {
  return state
}//return all the state (for now....)

export default connect(mapStateToProps)(AddNotes);