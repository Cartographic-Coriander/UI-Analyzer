import axios from 'axios';
var instance;

if (!!localStorage.getItem('Scrutinize.JWT.token')) {
  setToken(JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token);
}

//for creating instance when state is reloaded
export function setToken (token) {
  instance = axios.create({
    timeout: 1000,
    headers: {'x-access-token': token }
  });
}

//for signing up from the landing page
export function getUser (user) {
  const params = {
    email: user.emailField,
    password: user.passwordField
  };

  return axios.post('/api/user/signin', params)
    .then(function (response) {
      setToken(response.data.token);

      return response;
    });
}

export function postUser (user) {
  //user object sent to database formatted as defined below
  const params = {
    email: user.emailField,
    password: user.passwordField,
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company
  };

  return axios.post('/api/user/signup', params)
    .then(function (response) {
      setToken(response.data.token);

      return response;
    });
}

export function signOut () {
  return instance.delete('/api/user/signin');
}

export function getInvitation (invitation) {
  const params = {
    projectId: invitation.projectId
  };

  return instance.get('/api/invitation', { params: params });
}

export function postInvitation (invitation) {
  const params = {
    projectId: invitation.projectId,
    email: invitation.email,
    firstname: invitation.firstname,
    surname: invitation.surname,
  };

  return instance.post('/api/invitation', params);
}

export function getProject () {
  return instance.get('/api/project');
}

export function postProject (project) {
  const params = {
    name: project.name,
    description: project.description
  };

  return instance.post('/api/project', params);
}

export function updateProject (project) {
  const params = {
    projectId: project.projectId,
    name: project.name,
    description: project.description
  };

  return instance.put('/api/project', params);
}

export function deleteProject (project) {
  const params = {
    projectId: project.projectId
  };

  return instance.delete('/api/project', { params: params });
}

export function getTest (test) {
  const params = {
    projectId: test.projectId
  };

  return instance.get('/api/test', { params: params });
}

export function postTest (test) {
  const params = {
    projectId: test.projectId,
    name: test.name,
    url: test.url,
    prompt: test.prompt
  };

  return instance.post('/api/test', params);
}

export function updateTest (test) {
  const params = {
    testId: test.testId,
    projectId: test.projectId,
    name: test.name,
    url: test.url,
    prompt: test.prompt
  };

  return instance.put('/api/test', params);
}

export function deleteTest (test) {
  const params = {
    testId: test.testId,
    projectId: test.projectId
  };

  return instance.delete('/api/test', { params: params });
}

export function postTestView () {
  return instance.post('/testview');
}

export function getComment (comment) {
  const params = {
    imageId: comment.imageId
  };

  return instance.get('/api/comment', { params: params });
}

export function postComment (comments) {
  return instance.post('/api/comment', comments);
}

export function updateComment (comment) {
  const params = {
    imageId: comment.imageId,
    commentId: comment.id,
    commentType: comment.commentType,
    commentText: comment.commentText,
    x: comment.x,
    y: comment.y
  };

  return instance.put('/api/comment', params);
}

export function deleteComment (comment) {
  const params = {
    imageId: comment.imageId,
    commentId: comment.commentId
  };

  return instance.delete('/api/comment', { params: params });
}

export function getImage (image) {
  const params = {
    testId: image.id
  };

  return instance.get('/api/image', { params: params });
}

export function postImage (image) {
  const params = {
    testId: image.testId,
    image: image.image,
    url: image.url
  };

  return instance.post('/api/image', params);
}

export function updateImage (image) {
  const params = {
    imageId: image.imageId,
    testId: image.testId,
    image: image.image,
    url: image.url
  };

  return instance.put('/api/image', params);
}

export function deleteImage (image) {
  const params = {
    imageId: image.imageId,
    testId: image.testId,
  };

  return instance.delete('/api/image', { params: params });
}

export function getMouseTracking (mouseTracking) {
  const params = {
    imageId: mouseTracking.imageId
  };

  return instance.get('/api/mousetracking', { params: params });
}

export function postMouseTracking (mouseTracking) {
  const params = {
    imageId: mouseTracking.imageId,
    data: mouseTracking.data
  };

  return instance.post('/api/mousetracking', params);
}

export function updateMouseTracking (mouseTracking) {
  const params = {
    imageId: mouseTracking.imageId,
    mouseTrackingId: mouseTracking.mouseTrackingId,
    data: mouseTracking.data
  };

  return instance.put('/api/mousetracking', params);
}

export function deleteMouseTracking (mouseTracking) {
  const params = {
    imageId: mouseTracking.imageId,
    mouseTrackingId: mouseTracking.mouseTrackingId
  };

  return instance.delete('/api/mousetracking', { params: params });
}
