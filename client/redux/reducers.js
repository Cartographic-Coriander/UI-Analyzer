const initialState = {
  buttonOne: true,
  buttonTwo: true,
  notes: []
}

function buttonSwitch (state = initialState, action) {
  var newState = Object.assign({}, state)
  switch (action.type) {
    case 'SWITCH_VISIBILITY':
      console.log('aqui', action.button, state)
      newState[action.button] = !newState[action.button];
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

export default buttonSwitch