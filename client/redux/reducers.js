const userInitialState = {
  firstname: null,
  surname: null,
  company: null,
  email : null
};

const projectsInitialState = {
  list: []
};

const testsInitialState = {
  list: []
};

const commentsInitialState = {
  list: []
};

const imagesInitialState = {
  list: []
};

const mouseTrackingsInitialState = {
  list: []
};

const errorInitialState = {
  userError: null,
  projectError: null,
  testError: null,
  imageError: null,
  commentError: null,
  mouseTrackingError: null,
  invitationError: null
};

const modalInitialState = {
  addProjectModalVisibility: false
}

export function user (state = userInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_USER':
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
      newState.list[action.index].name = action.data.name;
      newState.list[action.index].description = action.data.description;
      return newState;
    case 'DELETE_PROJECT':
      var newList = [];
      newState.list.forEach(function (item) {
        if (Number(item.id) !== Number(action.data)) {
          newList.push(item);
        }
      });
      newState.list = newList;
      return newState;
  }
  return state;
};

export function tests (state = testsInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'GET_TEST':
      newState.list = action.data;
      return newState;
    case 'POST_TEST':
      var newList = newState.list.slice();
      newList.push(action.data);
      newState.list = newList;
      return newState;
    case 'UPDATE_TEST':
      newState.list[action.index].name = action.data.name;
      newState.list[action.index].prompt = action.data.prompt;
      newState.list[action.index].url = aciton.data.url;
      return newState;
    case 'DELETE_TEST':
      var newList = [];
      newState.list.forEach(function (item) {
        if (Number(item.id) !== Number(action.data)) {
          newList.push(item);
        }
      });
      newState.list = newList;
      return newState;
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
      var newList = newState.list.filter(item => item.id !== data.id);
      newState.list = newList;
      return newState;
    case 'RESET_COMMENT':
      newState.list = [];
      return newState;
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
      var newList = newState.list.filter(item => item.id !== data.id);
      newState.list = newList;
      return newState;
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
      var newList = newState.list.filter(item => item.id !== data.id);
      newState.list = newList;
      return newState;
  }
  return state;
};

export function errorState (state = errorInitialState, action) {
  var newState = Object.assign({}, state);

  switch (action.type) {
    case 'ERROR_USER':
      newState.userError = action.data;
      return newState;
    case 'ERROR_PROJECT':
      newState.projectError = action.data;
      return newState;
    case 'ERROR_TEST':
      newState.testError = action.data;
      return newState;
    case 'ERROR_TESTVIEW':
      newState.testError = action.data;
      return newState;
    case 'ERROR_COMMENT':
      newState.commentError = action.data;
      return newState;
    case 'ERROR_IMAGE':
      newState.imageError = action.data;
      return newState;
    case 'ERROR_MOUSETRACKING':
      newState.mouseTrackingError = action.data;
      return newState;
    case 'ERROR_INVITATION':
      newState.invitationError = action.data;
      return newState;
    case 'ERROR_RESET':
      return errorInitialState;
  }
  return state;
};

export function modalState (state = modalInitialState, action) {
  var newState = Object.assign({}, state);

  switch(action.type) {
    case 'ADD_PROJECT_MODAL':
      newState.addProjectModalVisibility = action.visibility;
      return newState;
  }
  return state;
}

