import { getImage, getAuthenticated, registerUser } from './api'

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

export function addNote (noteObj) {
  return {
    type: 'ADD_NOTE',
    note: noteObj
  }
}

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
    auth = true;
  } else {
    auth = false;
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
        //localStorage.setItem('le token', response.body);
        //
        localStorage.setItem('le token', response.statusText);
        dispatch(userLogin(user.emailField));
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
        //
        //TOKEN AND OTHER DATA WIL BE ACCESSED BY RESPONSE.BODY <uncomment when needed (when it is set up) >
        //
        //localStorage.setItem('le token', response.body);
        //
        function (response) {
        dispatch(signUpUser(user));
      })
  }
}

export function signUpUser (user) {
  return {
    type: 'REGISTER_USER',
    user: user
  }
}
/////////////////////end registering user ang grabbing JWT


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