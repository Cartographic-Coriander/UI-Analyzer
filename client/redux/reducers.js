const buttonInitialState = {
  buttonOne: true,
  buttonTwo: true,
  visibleContentComponent: 'Dashboard',
}

const noteInitialState = {
  notes: []
}

const projectInitialState = {
  confirm: { projectName: null, projectDescription: null },
  projects: []
}

export function buttonReducer (state = buttonInitialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'SWITCH_VISIBILITY':
      return newState[action.button] = !newState[action.button];
    case 'TOGGLE_CONTENT_COMPONENT':
      newState.visibleContentComponent = action.targetComponent;
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