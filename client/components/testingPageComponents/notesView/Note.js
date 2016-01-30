import React from 'react';


const Note = (props) => {
  
  let style = {
    position: 'absolute',
    top: props.y,
    left: props.x
  };

  return <div style={ style }>{ props.commentText }</div>
}

export default Note;