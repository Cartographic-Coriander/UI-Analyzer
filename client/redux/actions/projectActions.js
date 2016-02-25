import { getProject, postProject, updateProject, deleteProject } from '../api';

/* PROJECT API ACTIONS */

export function getsProject (callback) {
  return (dispatch) => {
    return getProject()
      .then((response) => {
        var params = {
          type: 'GET_PROJECT',
          data: response.data
        };

        return dispatch(params);
      })
      .then(() => {
        callback();
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_PROJECT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function postsProject (project) {
  return (dispatch) => {
    return postProject(project)
      .then((response) => {
        var params = {
          type: 'POST_PROJECT',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_PROJECT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function updatesProject (project) {
  return (dispatch) => {
    return updateProject(project)
      .then((response) => {
        var params = {
          type: 'UPDATE_PROJECT',
          name: project.name,
          description: project.description,
          index: project.index
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_PROJECT',
          data: error
        };

        dispatch(params);
      });
  };
}

export function deletesProject (project, browserHistory) {
  return (dispatch) => {
    return deleteProject(project)
      .then((response) => {
        var params = {
          type: 'DELETE_PROJECT',
          data: project.projectId
        };

        dispatch(params);
        browserHistory.push('/dashboard');
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_PROJECT',
          data: error
        };

        dispatch(params);
      });
  };
}