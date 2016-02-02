import axios from 'axios';

export function getImage () {
  return axios.get('/api/image')
}

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