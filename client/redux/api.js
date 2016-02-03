import axios from 'axios';

export function getImage () {
  return axios.get('/api/image')
}

//for signing up from the landing page
export function getStarted () {
  console.log('inside getstarted');
  //////some fake data for testing
  var fakeUser = {
    email: 'fake@fakey.com',
    password: 'lefakerson',
    company: 'fake',
    surname: 'fake',
    firstname: 'faked'
  }
  return axios.post('/api/users/signup', fakeUser);
}
//for signing up from the landing page

////////logging in
export function logIn (user) {
  var fakeUser = {
    email: 'fake@fakey.com',
    password: 'lefakerson'
  }
  return axios.post('/api/users/signin', fakeUser);
}

////////////////////this api call is attached to an action attached to the form that is now in a  modal...i think
export function getAuthenticated (user) {
  //user object sent to database formatted as defined below
  const loginUser = {
    email: user.emailField,
    password: user.passwordField
  };
  // console.log('to send to database', loginUser)
  return axios.post('/api/users/signin', loginUser);
}

export function registerUser (user) {
  //user object sent to database formatted as defined below
  const loginUser = {
    email: user.emailField,
    password: user.passwordField,
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company
  };
  // console.log('the object to send to databse ',loginUser);
  return axios.post('/api/users/signup', loginUser);
}


export function sendAllNotes (allNotes) {
  //this is sending an array of notes {x:x position, y: y position, commentText, commentType}
  return axios.post('/api/comment', allNotes);
}