import {
  getUser, postUser,
  getProject, postProject, updateProject, deleteProject,
  getTest, postTest, updateTest, deleteTest,
  getComment, postComment, updateComment, deleteComment,
  getImage, postImage, updateImage, deleteImage,
  getMouseTracking, postMouseTracking, updateMouseTracking, deleteMouseTracking
} from './api'

/* PROJECT API ACTIONS */

export getsProject = (project) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export postsProject = (project) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export updatesProject = (project) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export deletesProject = (project) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

/* TEST API ACTIONS */

export getsTest = (test) => {
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
        var params = {
          type: 'ERROR_TEST',
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export postsTest = (test) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export updatesTest = (test) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export deletesTest = (test) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

/* COMMENT API ACTIONS */

export getsComment = (comment) => {
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
        var params = {
          type: 'ERROR_COMMENT',
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export postsComment = (comment) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export updatesComment = (comment) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export deletesComment = (comment) => {
  return (dispatch) => {
    return deleteComment(comment)
      .then((response) => {
        var params = {
          type: 'DELETE_COMMENT',
          data: comment.commentId
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_COMMENT',
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

/* IMAGE API ACTIONS */

export getsImage = (image) => {
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
        var params = {
          type: 'ERROR_IMAGE',
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export postsImage = (image) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export updatesImage = (image) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export deletesImage = (image) => {
  return (dispatch) => {
    return deleteImage(image)
      .then((response) => {
        var params = {
          type: 'DELETE_IMAGE',
          data: image.imageId
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_IMAGE',
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

/* MOUSETRACKING API ACTIONS */

export getsMouseTracking = (mouseTracking) => {
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
        var params = {
          type: 'ERROR_MOUSETRACKING',
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export postsMouseTracking = (mouseTracking) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export updatesMouseTracking = (mouseTracking) => {
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
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

export deletesMouseTracking = (mouseTracking) => {
  return (dispatch) => {
    return deleteMouseTracking(mouseTracking)
      .then((response) => {
        var params = {
          type: 'DELETE_MOUSETRACKING',
          data: mouseTracking.mouseTrackingId
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_MOUSETRACKING',
          data: error.split('\n')[0]
        };

        dispatch(params);
      })
  }
}

/* END API ACTIONS */

export function switchVisibility (button) {
  return {
    type: 'SWITCH_VISIBILITY',
    button: button
  }
}

export function toggleContentComponent (targetComponent) {
  return {
    type: 'TOGGLE_CONTENT_COMPONENT',
    targetComponent: targetComponent
  }
}

export function inviteTesters () {
  type: 'TOGGLE_INVITE_USER'
}

//////////////////////////////////////modal state

export function showLoginModal (action) {
  var visibility = 'MODAL_RESET';
  if (action) {
    visibility = 'SHOW_LOGIN';
  }
  console.log('visibility', visibility)
  return {
    type: visibility,
    action: action
  }
}

export function showSignupModal (action) {
  var visibility = 'MODAL_RESET';
  if (action) {
    visibility = 'SHOW_GET_STARTED';
  }
  return {
    type: visibility,
    action: action
  }
}

//////////////////////////end modal state


///////////////////////note part (adding comments to critique image)
////////////////////////////////////adds note to array kept in state
export function addNote (noteObj) {
  return {
    type: 'ADD_NOTE',
    note: noteObj
  }
}

////////////////////////////////////////sends note array to server
export function postComments (notes) {
  return function (dispatch) {
    return getComment (notes)
      .then(function (success) {
        console.log('successful in sending notes');
      }, function (error) {
        throw new Error(error);
      })
  }
}

///////////////////////////////end note part (comment for critiquing)



export function addProject (project) {
  return {
    type: 'ADD_PROJECT',
    project: project
  }
}

export function confirmProject (project) {
  return {
    type: 'CONFIRM_PROJECT',
    project: project
  }
}


///////////this below is being called from landing page get started button, may have to change name later, or attach to submit button in modal
export function authChecker (auth) {
  var userAuthObject = {
    type: 'AUTHENTICATED_USER',
    auth: 'not_authenticated'
  }
  if (auth === 'authenticate_me') {
    return function (dispatch) {
      //request from landing page to make new user, make request to db
      return getStarted ()
        .then(function (response) {
          localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
          //we have set token in localstorage, set auth to authenticated and dispatch
          userAuthObject.auth = 'authenticated';
          dispatch(userAuthObject)
        }, function (error) {
          //handling errors
          console.log('error :', error);
          //dispatch not authenticated auth status
          dispatch(userAuthObject);
        })
      }
  } else {
      return function (dispatch) {
      //dispatch not authenticated auth status
      dispatch(userAuthObject);
    }
  }
}


///////////////this below is being called the form that appears on the landing page
export function loggingIn (user) {
  var userAuthObject = {
    type: 'AUTHENTICATED_USER',
    auth : 'not_authenticated'
  }
  return function (dispatch) {
    logIn(user)
      .then(function (response) {
        localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
        //we have set token in localstorage, set auth to authenticated and dispatch
        userAuthObject.auth = 'authenticated';
        dispatch(userAuthObject);
      }, function (error) {
        console.log('error ', error);
        dispatch(userAuthObject);
      })
  }
}
////////////////////////////////////////////////////////////////////////////////////



///////////////for making api call to auth and grab user JWT
export function authUser (user) {
  return function (dispatch) {
    return getUser(user)
      .then(function (response) {
        localStorage.setItem('Scrutinize.JWT.token', response.statusText);
        dispatch(userLogin(user.emailField));
      }, function (error) {
        throw new Error(error)
      })
  }
}

export function userLogin (email) {
  return {
    type : 'USER_LOGIN',
    email: email
  }
}
///////////end for making api call to auth and grab user JWT



////////////////////////registering user and getting user JWT, called from submission of get_started form
export function makeUser (user) {
  return function (dispatch) {
    return postUser(user)
      .then(function (response) {
          localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
          dispatch(signUpUser(user));
          dispatch({
            type: 'AUTHENTICATED_USER',
            auth: 'authenticated'
          })
      }, function (error) {
        throw new Error(error);
      })
  }
}

export function signUpUser (user) {
  return {
    type: 'REGISTER_USER',
    user: user
  }
}
////////////////////////end registering user and grabbing JWT



////////////////////////////for making api call to grab image
export function getImageForNotes () {
  return function (dispatch) {
    return getImage()
      .then(
      function (image) {
        dispatch(updateImageForNotes(image));
      })
  }
}

function updateImageForNotes (image) {
  return {
    type: 'UPDATE_IMAGE',
    image: image
  }
}
///////////////////////end for making api call to grab image




///////////////button handler for show image to and from dashboard page

export function showImagePage (type) {
  var auth = 'not_authenticated';
  if(type === 'show_image') {
    auth = 'Image_Appear';
  }
  if(type === 'returnToDashboard') {
    auth = 'authenticated';
  }
  return {
    type: 'AUTHENTICATED_USER',
    auth: auth
  }
}

//////////////////////////////////end show image to and from dashboard
