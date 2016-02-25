import { getUser, postUser, signOut } from '../api';

/* USER API ACTIONS */

export function getsUser (user, browserHistory) {
  return (dispatch) => {
    return getUser(user)
      .then((response) => {
        let params = {
          type: 'GET_USER',
          data: response.data.user
        };
        let userParams = {
          type: 'SET_FOCUS',
          key: 'user',
          value: response.data.user
        };

        localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
        dispatch(params);
        dispatch(userParams);
      })
      .then(() => {
        return getProject()
          .then((projects) => {
            var params = {
              type: 'GET_PROJECT',
              data: projects.data
            };

            dispatch(params);
            browserHistory.push('/dashboard');
          });
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_USER',
          data: error
        };

        dispatch(params);
      });
  };
}

export function postsUser (user, browserHistory) {
  return (dispatch) => {
    return postUser(user)
      .then((response) => {
        var params = {
          type: 'PAGE_STATE',
          auth: 'authenticated'
        };
        response.type = 'POST_USER';

        localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
        dispatch(response);
        dispatch(params);
        browserHistory.push('/dashboard');
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_USER',
          data: error
        };

        dispatch(params);
      });
  };
}

export function signsOut (browserHistory) {
  return (dispatch) => {
    return signOut()
      .then((response) => {
        var params = {
          type: 'SIGNOUT_USER'
        };

        browserHistory.push('/');
        window.localStorage.removeItem('Scrutinize.JWT.token');
        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_USER',
          data: error
        };

        dispatch(params);
      });
  };
}