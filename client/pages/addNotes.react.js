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


// document.addEventListener("click", findMousePosAndAddInput);

class AddNotes extends Component {

    findMousePosAndAddInput(event) {
      var cursorX = event.pageX;
      var cursorY = event.pageY;
      var critiqueImage = document.getElementById('critiqueImage');
      if (cursorY < critiqueImage.clientHeight && cursorX < critiqueImage.clientWidth) {
        
        if(document.getElementById('inputText') === null) {
          
          var text = document.createElement('div');
          text.style.top=cursorY+"px";
          text.style.left=cursorX+"px";
          text.style.position="absolute";
          text.innerHTML = "<input id='inputText' type='text' /><button id='leaveCommentButton' type='button'>send</button>";
          document.getElementById('critiqueImage').appendChild(text);
          document.getElementById('inputText').focus();
          
          $('#leaveCommentButton').on('click', function () {
            var critique = $('#inputText').val();
            var xCoordCritique = $('#inputText').parent().css('left').match(/\d/g).join('');
            var yCoordCritique = $('#inputText').parent().css('top').match(/\d/g).join('');
            var newCritiqueObj = {
              x: xCoordCritique,
              y: yCoordCritique,
              commentText: critique,
              commentType: 'scalding critique'
            }
            console.log(newCritiqueObj);
            console.log('this is' , this)
            this.props.dispatch(switchVisibility('not buttons'));
            setTimeout(()=>{$('#critiqueImage').children().last().remove()},5);
          }.bind(this))
        }
      }
  }

  render() {
    return (
      <div id='critiqueImage' style={divStyle} onClick={this.findMousePosAndAddInput.bind(this)}>      
        {allMessages}
      </div>
      )
  }

}

function mapStateToProps(state) {
  return state
}//return all of the state!!

export default connect(mapStateToProps)(AddNotes);