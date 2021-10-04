import { getComment, postComment, updateComment, deleteComment } from '../api';

/* COMMENT API ACTIONS */

export function getsComment (comment) {
  return (dispatch) => {
    return getComment(comment)
      .then((response) => {
        var params = {
          type: 'GET_COMMENT',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        if (error.status === 550) {
          var params = {
            type: 'GET_COMMENT',
            data: []
          };
        } else {
          var params = {
            type: 'ERROR_COMMENT',
            data: error
          };
        }

        dispatch(params);
      });
  };
}

export function postsComment (comment) {
  return (dispatch) => {
    return postComment(comment)
      .then((response) => {
        var params = {
          type: 'POST_COMMENT',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_COMMENT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function updatesComment (comment) {
  return (dispatch) => {
    return updateComment(comment)
      .then((response) => {
        var params = {
          type: 'UPDATE_COMMENT',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_COMMENT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function deletesComment (comment) {
  return (dispatch) => {
    return deleteComment(comment)
      .then((response) => {
        var params = {
          type: 'DELETE_COMMENT',
          data: comment.id
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_COMMENT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function resetsComment () {
  return {
    type: 'RESET_COMMENT'
  };
}