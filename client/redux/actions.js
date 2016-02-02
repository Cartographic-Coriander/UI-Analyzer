import { getImage, getAuthenticated, registerUser, sendAllNotes } from './api'

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
      })
      .catch(function (error) {
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

export function authChecker (auth) {
  if (auth === 'authenticated') {
    auth = 'authenticated';
  } else {
    auth = 'not_authenticated';
  }
  return {
    type: 'AUTHENTICATED_USER',
    auth: auth
  }
}

///////////////for making api call to auth and grab user JWT
export function authUser (user) {
  return function (dispatch) {
    return getAuthenticated(user)
      .then(function (response) {
        //
        //TOKEN AND OTHER DATA WILL BE ACCESSED BY RESPONSE.BODY <uncomment when needed (when it is set up) >
        //
        //localStorage.setItem('Scrutinize.JWT.token', response.body);
        //
        localStorage.setItem('Scrutinize.JWT.token', response.statusText);
        dispatch(userLogin(user.emailField));
      })
      .catch(function (response) {
        throw new Error(response);
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


////////////////////////registering user and getting user JWT
export function makeUser (user) {
  return function (dispatch) {
    return registerUser(user)
      .then(
        function (response) {
        //
        //TOKEN AND OTHER DATA WIL BE ACCESSED BY RESPONSE.BODY <uncomment when needed (when it is set up) >
        //
        //localStorage.setItem('Scrutinize.JWT.token', response.body);
        //
        dispatch(signUpUser(user));
      })
      .catch(function (error) {
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


///////////////button handler for show image from dashboard page
export function showImagePage () {
  console.log('showimagepage called')
  return {
    type: 'AUTHENTICATED_USER',
    auth: 'Image_Appear'
  }
}

//////////////////////////////////end show image from dashboard
