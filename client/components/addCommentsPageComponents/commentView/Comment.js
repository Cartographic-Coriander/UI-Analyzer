import React from 'react';

const Note = (props) => {
  let style = {
    position: 'absolute',
    top: props.y,
    left: props.x
  };

  return (
    <div className = "quote-container" style = { style } >
      {
        (() => {
          if (props.commentType !== "positive") {
            return (
              <div>
                <div className = "commentPin redPin" >
                </div>
                <blockquote className = "note color redcomment" >
                  { props.commentText }
                  <cite className = "author"></cite>
                </blockquote>
              </div>
            );
          } else {
            return (
              <div>
                <div className = "commentPin greenPin" >
                </div>
                <blockquote className = "note color greencomment" >
                  { props.commentText }
                  <cite className = "author"></cite>
                </blockquote>
              </div>
            );
          }
        })()
      }
    </div>
  );
}

export default Note;