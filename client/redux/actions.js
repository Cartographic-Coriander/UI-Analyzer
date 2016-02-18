import {
  getUser, postUser, signOut,
  getInvitation, postInvitation,
  getProject, postProject, updateProject, deleteProject,
  getTest, postTest, updateTest, deleteTest,
  getComment, postComment, updateComment, deleteComment,
  getImage, postImage, updateImage, deleteImage,
  getMouseTracking, postMouseTracking, updateMouseTracking, deleteMouseTracking
} from './api'

/* PROJECT API ACTIONS */

/* USER API ACTIONS */

export function getsUser (user) {
  return (dispatch) => {
    return getUser(user)
      .then((response) => {
        let params = {
          type: 'GET_USER',
          data: response.data.user
        };
        let userParams = {
          type: 'SET_FOCUS',
          key: 'user',
          value: response.data.user
        };

        localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
        dispatch(params);
        dispatch(userParams);
      })
      .then(() => {
        let params = {
          type: 'SIGNIN_USER'
        };

        dispatch(params);
      })
      .then(() => {
        return getProject()
          .then((projects) => {
            var params = {
              type: 'GET_PROJECT',
              data: projects.data
            };

            dispatch(params);
          });
      })
      .catch((error) => {
        let data = 'user error';
        switch (error.status){
          case 401:
            data = 'please re-enter password';
            break;
          case 500:
            data = 'unauthorized request';
            break;
          case 409: 
            data = 'username taken';
            break;
        }
        
        var params = {
          type: 'ERROR_USER',
          data: data
        };

        dispatch(params);
      });
  };
}

export function postsUser (user) {
  return (dispatch) => {
    return postUser(user)
      .then((response) => {
        var params = {
          type: 'PAGE_STATE',
          auth: 'authenticated'
        };
        response.type = 'POST_USER';

        localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
        dispatch(response);
        // dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_USER',
          data: error
        };

        dispatch(params);
      });
  };
}

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

/* PROJECT API ACTIONS */

export function getsProject (project) {
  return (dispatch) => {
    return getProject(project)
      .then((response) => {
        var params = {
          type: 'GET_PROJECT',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_PROJECT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function postsProject (project) {
  return (dispatch) => {
    return postProject(project)
      .then((response) => {
        var params = {
          type: 'POST_PROJECT',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_PROJECT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function updatesProject (project) {
  return (dispatch) => {
    return updateProject(project)
      .then((response) => {
        var params = {
          type: 'UPDATE_PROJECT',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_PROJECT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function deletesProject (project) {
  return (dispatch) => {
    return deleteProject(project)
      .then((response) => {
        var params = {
          type: 'DELETE_PROJECT',
          data: project.projectId
        };
        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_PROJECT',
          data: error
        };

        dispatch(params);
      });
  };
}

/* TEST API ACTIONS */

export function getsTest (test) {
  return (dispatch) => {
    return getTest(test)
      .then((response) => {
        var params = {
          type: 'GET_TEST',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        if (error.status === 550) {
          var params = {
            type: 'GET_TEST',
            data: []
          };
        } else {
          var params = {
            type: 'ERROR_TEST',
            data: error
          };
        }

        dispatch(params);
      });
  };
}

export function postsTest (test) {
  return (dispatch) => {
    return postTest(test)
      .then((response) => {
        var params = {
          type: 'POST_TEST',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_TEST',
          data: error
        };

        dispatch(params);
      });
  };
}

export function updatesTest (test) {
  return (dispatch) => {
    return updateTest(test)
      .then((response) => {
        var params = {
          type: 'UPDATE_TEST',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_TEST',
          data: error
        };

        dispatch(params);
      });
  };
}

export function deletesTest (test) {
  return (dispatch) => {
    return deleteTest(test)
      .then((response) => {
        var params = {
          type: 'DELETE_TEST',
          data: test.testId
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_TEST',
          data: error
        };

        dispatch(params);
      });
  };
}

/* COMMENT API ACTIONS */

export function getsComment (comment) {
  if (comment === 'clear') {
    return {
      type: 'IMAGE_CLEAR'
    }
  };
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

/* IMAGE API ACTIONS */

export function getsImage (image) {
  return (dispatch) => {
    return getImage(image)
      .then((response) => {
        var params = {
          type: 'GET_IMAGE',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        if (error.status === 550) {
          var params = {
            type: 'GET_IMAGE',
            data: []
          };
        } else {
          var params = {
            type: 'ERROR_IMAGE',
            data: error
          };
        }

        dispatch(params);
      });
  };
}

export function postsImage (image) {
  return (dispatch) => {
    return postImage(image)
      .then((response) => {
        var params = {
          type: 'POST_IMAGE',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_IMAGE',
          data: error
        };

        dispatch(params);
      });
  };
}

export function updatesImage (image) {
  return (dispatch) => {
    return updateImage(image)
      .then((response) => {
        var params = {
          type: 'UPDATE_IMAGE',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_IMAGE',
          data: error
        };

        dispatch(params);
      });
  };
}

export function deletesImage (image) {
  return (dispatch) => {
    return deleteImage(image)
      .then((response) => {
        var params = {
          type: 'DELETE_IMAGE',
          data: image.id
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_IMAGE',
          data: error
        };

        dispatch(params);
      });
  };
}

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

export function signsOut () {
  return (dispatch) => {
    return signOut()
      .then((response) => {
        var params = {
          type: 'SIGNOUT_USER'
        }

        window.localStorage.removeItem('Scrutinize.JWT.token');
        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_USER',
          data: error
        };

        dispatch(params);
      });
  };
}

/* END API ACTIONS */

export function setFocus (key, value) {
  return {
    type: 'SET_FOCUS',
    key: key,
    value: value
  };
}

export function pageState (target) {
  return {
    type: 'PAGE_STATE',
    target: target
  };
}

export function contentState (target) {
  return {
    type: 'CONTENT_STATE',
    target: target
  };
}

export function inviteTesters () {
  return {
    type: 'TOGGLE_INVITE_USER'
  };
}

/* MODAL ACTIONS */

export function showLoginModal (bool) {
  var visibility = bool ? 'SHOW_LOGIN' : 'MODAL_RESET';

  return {
    type: visibility
  };
}

export function showSignupModal (bool) {
  var visibility = bool ? 'SHOW_GET_STARTED' : 'MODAL_RESET';

  return {
    type: visibility
  };
}

/*END MODAL ACTIONS */

export function addProject (project) {
  return {
    type: 'ADD_PROJECT',
    data: project
  };
}

export function resetError () {
  return {
    type: 'ERROR_RESET'
  };
}