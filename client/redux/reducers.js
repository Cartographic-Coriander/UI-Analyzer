const stateRouterInitialState = {
  pageState: 'not_authenticated',
  contentState: 'Dashboard'
}

const modalInitialState = {
  login: false,
  getStarted: false
}

const userInitialState = {
  firstname: null,
  surname: null,
  company: null,
  email : null
};

const projectsInitialState = {
  list: [],
  error: null
};

const testsInitialState = {
  list: [],
  error: null
};

const commentsInitialState = {
  list: [],
  error: null
};

const imagesInitialState = {
  list: [],
  error: null
};

const mouseTrackingsInitialState = {
  list: [],
  error: null
};

const currentFocusInitialState = {
  userId: null,
  projectId: null,
  testId: null,
  imageId: null,
  commentId: null,
  mouseTrackingId: null
};

export function user (state = userInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_USER':
      console.log('data from user', action.data)
      newState.firstname = action.data.firstname;
      newState.surname = action.data.surname;
      newState.company = action.data.company;
      newState.email = action.data.email;
      return newState;
    case 'POST_USER':
      newState.firstname = action.data.firstname;
      newState.surname = action.data.surname;
      newState.company = action.data.company;
      newState.email = action.data.email;
      return newState;
    case 'UPDATE_USER':
      return newState;
    case 'DELETE_USER':
      return newState;
    case 'ERROR_USER':
      return state.error(action.data);
  }
  return state;
};

export function projects (state = projectsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_PROJECT':
      newState.list = action.data;
      return newState;
    case 'POST_PROJECT':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_PROJECT':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_PROJECT':
      var newList = newState.list.filter(item => item.id !== data.projectId);
      newState.list = newList;
      return newState;
    case 'ERROR_PROJECT':
      return state.error(action.data);
  }
  return state;
};

export function tests (state = testsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_TEST':
      console.log(action)
      newState.list = action.data;
      return newState;
    case 'POST_TEST':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_TEST':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_TEST':
      var newList = newState.list.filter(item => item.id !== data.testId);
      newState.list = newList;
      return newState;
    case 'ERROR_TEST':
      return state.error(action.data);
  }
  return state;
};

export function comments (state = commentsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_COMMENT':
      newState.list = action.data;
      return newState;
    case 'POST_COMMENT':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_COMMENT':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_COMMENT':
      var newList = newState.list.filter(item => item.id !== data.commentId);
      newState.list = newList;
      return newState;
    case 'ERROR_COMMENT':
      return state.error(action.data);
  }
  return state;
};

export function images (state = imagesInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_IMAGE':
      newState.list = action.data;
      return newState;
    case 'POST_IMAGE':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_IMAGE':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_IMAGE':
      var newList = newState.list.filter(item => item.id !== data.imageId);
      newState.list = newList;
      return newState;
    case 'ERROR_IMAGE':
      return state.error(action.data);
  }
  return state;
};

export function mouseTrackings (state = mouseTrackingsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_MOUSETRACKING':
      newState.list = action.data;
      return newState;
    case 'POST_MOUSETRACKING':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_MOUSETRACKING':
      var newList = newState.list.map(item => item.id === data.id ? item = data : item);
      newState.list = newList;
      return newState;
    case 'DELETE_MOUSETRACKING':
      var newList = newState.list.filter(item => item.id !== data.mouseTrackingId);
      newState.list = newList;
      return newState;
    case 'ERROR_MOUSETRACKING':
      return state.error(action.data);
  }
  return state;
};

export function currentFocus (state = currentFocusInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'SET_FOCUS':
      newState[action.key] = action.value;
      return newState
  }
  return state;
}

export function stateRouter (state = stateRouterInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'PAGE_STATE':
      newState.pageState = action.target;
      return newState;
    case 'CONTENT_STATE':
      newState.contentState = action.target;
      return newState;
    case 'GET_USER':
      newState.pageState = 'authenticated';
      return newState;
    case 'SIGNOUT_USER':
      newState.pageState = 'not_authenticated';
      return newState;
  }
  return state;
};

export function modalState (state = modalInitialState, action) {
  var newState = Object.assign({}, state);

  switch(action.type) {
    case 'SHOW_LOGIN':
      newState.login = true;
      newState.getStarted = false;
      return newState;
    case 'SHOW_GET_STARTED':
      newState.getStarted = true;
      newState.login = false;
      return newState;
    case 'MODAL_RESET':
      newState.login = false;
      newState.getStarted = false;
      return newState;
  }
  return state;
};


