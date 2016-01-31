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
    console.log(auth);
    auth = true;
  } else {
    auth = false;
  }
  return {
    type: 'AUTHENTICATED_USER',
    auth: auth
  }
}
