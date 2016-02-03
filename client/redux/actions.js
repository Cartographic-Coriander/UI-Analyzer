import { getImage, getAuthenticated, registerUser, sendAllNotes, getStarted, logIn } from './api'

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
export function sendNotes (notes) { 
  return function (dispatch) {
    return sendAllNotes (notes)
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
    return getAuthenticated(user)
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
    return registerUser(user)
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
