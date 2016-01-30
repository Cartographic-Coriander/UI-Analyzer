const initialState = {
  buttonOne: true,
  buttonTwo: true,
  visibleContentComponent: 'Dashboard',
  notes: []
}

export default function reducer (state = initialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'SWITCH_VISIBILITY':
      return newState[action.button] = !newState[action.button];
    case 'TOGGLE_CONTENT_COMPONENT':
      newState.visibleContentComponent = action.targetComponent;
      return newState;
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