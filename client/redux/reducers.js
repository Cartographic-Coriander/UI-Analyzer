const buttonInitialState = {
  buttonOne: true,
  buttonTwo: true,
  activeContentComponent: 'Dashboard',
}

const noteInitialState = {
  notes: []
}

const projectInitialState = {
  confirm: { projectName: null, projectDescription: null },
  projects: []
}

const authenticationInitialState = {
  authenticated: false
}

const loginInitialState = {
  email : null,
  password : null
}

const registrationInitialState = {
  firstName: null,
  lastName: null,
  company: null,
  email : null,
  password: null
}

const imageUpdateInitialState = {
  image: null
}

export function authReducer (state = authenticationInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'AUTHENTICATED_USER':
      newState.authenticated = action.auth;
      return newState;
  }
  return state
}

export function buttonReducer (state = buttonInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'SWITCH_VISIBILITY':
    console.log(state)
      return newState[action.button] = !newState[action.button];
    case 'TOGGLE_CONTENT_COMPONENT':
      newState.activeContentComponent = action.targetComponent;
      return newState;
    default:
      return state;
  }
  return state
}

export function noteReducer (state = noteInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'ADD_NOTE':
      var newComments = state['notes'].slice();
      newComments.push(action.note);
      newState['notes'] = newComments;
      return newState;
    default:
      return state;
  }
  return state
}

export function projectReducer (state = projectInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'ADD_PROJECT':
      var newProjects = state.projects.slice();
      newProjects.push(action.project);
      newState.projects = newProjects;
      return newState;
    case 'CONFIRM_PROJECT':
      console.log('confirm', action)
      newState.confirm = action.project;
      return newState;
    default:
      return state;
  }
  return state
}

export function loginReducer (state = loginInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'USER_LOGIN':
      newState.email = action.user.emailField;
      newState.password = action.user.passwordField;
      console.log('the new state: ', newState)
      return newState;
  }
  return state;
}

export function registrationReducer (state = registrationInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'REGISTER_USER' :
      newState.firstName = action.user.firstName;
      newState.lastName = action.user.lastName;
      newState.company = action.user.company;
      newState.email = action.user.emailField;
      newState.password = action.user.passwordField;
      return newState;
  }
  return state;
}

export function imageUpdateReducer (state = imageUpdateInitialState, action) {
  var newState = Object.assign({}, state);
  switch (action.type) {
    case 'UPDATE_IMAGE' :
      newState.image = action.image.data;
      return newState;
  }
  return state;
}