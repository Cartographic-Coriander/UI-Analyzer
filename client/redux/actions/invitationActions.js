import { getInvitation, postInvitation } from '../api';

/* INVITATION API ACTIONS */

export function getsInvitation (invitation) {
  return (dispatch) => {
    return getInvitation(invitation)
      .then((response) => {
        var params = {
          type: 'GET_INVITATION',
          data: response
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_INVITATION',
          data: error
        };

        dispatch(params);
      });
  };
}

export function postsInvitation (invitation) {
  return (dispatch) => {
    return postInvitation(invitation)
      .then((response) => {
        var params = {
          type: 'POST_INVITATION',
          data: response
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_INVITATION',
          data: error
        };

        dispatch(params);
      });
  };
}