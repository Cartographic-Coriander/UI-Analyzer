import { getMouseTracking, postMouseTracking, updateMouseTracking, deleteMouseTracking } from '../api';

/* MOUSETRACKING API ACTIONS */

export function getsMouseTracking (mouseTracking) {
  return (dispatch) => {
    return getMouseTracking(mouseTracking)
      .then((response) => {
        var params = {
          type: 'GET_MOUSETRACKING',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        if (error.status === 550) {
          var params = {
            type: 'GET_MOUSETRACKING',
            data: []
          };
        } else {
          var params = {
            type: 'ERROR_MOUSETRACKING',
            data: error
          };
        }

        dispatch(params);
      });
  };
}

export function postsMouseTracking (mouseTracking) {
  return (dispatch) => {
    return postMouseTracking(mouseTracking)
      .then((response) => {
        var params = {
          type: 'POST_MOUSETRACKING',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_MOUSETRACKING',
          data: error
        };

        dispatch(params);
      });
  };
}

export function updatesMouseTracking (mouseTracking) {
  return (dispatch) => {
    return updateProject(mouseTracking)
      .then((response) => {
        var params = {
          type: 'UPDATE_MOUSETRACKING',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_MOUSETRACKING',
          data: error
        };

        dispatch(params);
      });
  };
}

export function deletesMouseTracking (mouseTracking) {
  return (dispatch) => {
    return deleteMouseTracking(mouseTracking)
      .then((response) => {
        var params = {
          type: 'DELETE_MOUSETRACKING',
          data: mouseTracking.id
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_MOUSETRACKING',
          data: error
        };

        dispatch(params);
      });
  };
}