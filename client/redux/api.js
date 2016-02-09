import axios from 'axios';

var instance;
//for creating instance when state is reloaded
export function recallState () {
  instance = axios.create({
    timeout: 1000,
    headers: {'x-access-token': JSON.parse(localStorage.getItem('Scrutinize.JWT.token')).token }
  });
};

//for signing up from the landing page
export function getUser (user) {
  const params = {
    email: user.emailField,
    password: user.passwordField
  };

  return axios.post('/api/users/signin', params)
    .then(function (response) {
      instance = axios.create({
        timeout: 1000,
        headers: { 'x-access-token': response.data.token }
      });

      return response;
    })
}

export function postUser (user) {
  //user object sent to database formatted as defined below
  const params = {
    email: user.emailField,
    password: user.passwordField,
    firstName: user.firstName,
    lastName: user.lastName,
    company: user.company
  }

  return axios.post('/api/users/signup', params)
    .then(function (response) {
      instance = axios.create({
        timeout: 1000,
        headers: { 'x-access-token': response.data.token }
      });

      return response;
    })
}

export function signOut () {
  return instance.delete('/api/users/signin')
}

export function getProject () {
  return instance.get('/api/project');
}

export function postProject (project) {
  const params = {
    name: project.name,
    description: project.description
  }

  return instance.post('/api/project', params);
}

export function updateProject (project) {
  const params = {
    projectId: project.projectId,
    name: project.name,
    description: project.description
  }
  
  return instance.put('/api/project', params);
}

export function deleteProject (project) {
  const params = {
    projectId: project.projectId
  }

  return instance.delete('/api/project', { params: params });
}

export function getTest (test) {
  const params = {
    projectId: test.projectId
  }

  return instance.get('/api/test', { params: params });
}

export function postTest (test) {
  const params = {
    projectId: test.projectId,
    name: test.name,
    url: test.url,
    prompt: test.prompt
  }

  return instance.post('/api/test', params);
}

export function updateTest (test) {
  const params = {
    testId: test.testId,
    projectId: test.projectId,
    name: test.name,
    url: test.url,
    prompt: test.prompt
  }

  return instance.put('/api/test', params);
}

export function deleteTest (test) {
  const params = {
    testId: test.testId,
    projectId: test.projectId
  }

  return instance.delete('/api/test', params);
}

export function getComment (comment) {
  const params = {
    imageId: comment.imageId
  }

  return instance.get('/api/comment', { params: params });
}

export function postComment (comment) {
  const params = {
    imageId: comment.imageId,
    commentType: comment.commentType,
    commentText: comment.commentText,
    x: comment.x,
    y: comment.y
  }

  return instance.post('/api/comment', params);
}

export function updateComment (comment) {
  const params = {
    imageId: comment.imageId,
    commentId: comment.id,
    commentType: comment.commentType,
    commentText: comment.commentText,
    x: comment.x,
    y: comment.y
  }

  return instance.put('/api/comment', params);
}

export function deleteComment (comment) {
  const params = {
    imageId: comment.imageId,
    commentId: comment.commentId
  }

  return instance.delete('/api/comment', params);
}

export function getImage (image) {
  const params = {
    testId: image.testId
  }

  return instance.get('/api/image', { params: params });
}

export function postImage (image) {
  const params = {
    testId: image.testId,
    image: image.image,
    url: image.url
  }

  return instance.post('/api/image', params);
}

export function updateImage (image) {
  const params = {
    imageId: image.imageId,
    testId: image.testId,
    image: image.image,
    url: image.url
  }

  return instance.put('/api/image', params);
}

export function deleteImage (image) {
  const params = {
    imageId: image.imageId,
    testId: image.testId,
  }

  return instance.delete('/api/image', params);
}

export function getMouseTracking (mouseTracking) {
  const params = {
    imageId: mouseTracking.imageId
  }

  return instance.get('/api/mousetracking', { params: params });
}

export function postMouseTracking (mouseTracking) {
  const params = {
    imageId: mouseTracking.imageId,
    movement: mouseTracking.movement,
    clicks: mouseTracking.clicks,
    urlchange: mouseTracking.urlchange
  }

  return instance.post('/api/mousetracking', params);
}

export function updateMouseTracking (mouseTracking) {
  const params = {
    imageId: mouseTracking.imageId,
    mouseTrackingId: mouseTracking.mouseTrackingId,
    movement: mouseTracking.movement,
    clicks: mouseTracking.clicks,
    urlchange: mouseTracking.urlchange
  }

  return instance.put('/api/mousetracking', params);
}

export function deleteMouseTracking (mouseTracking) {
  const params = {
    imageId: mouseTracking.imageId,
    mouseTrackingId: mouseTracking.mouseTrackingId
  }

  return instance.delete('/api/mousetracking', params);
}
