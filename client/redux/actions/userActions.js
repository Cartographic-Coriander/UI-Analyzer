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

        localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
        browserHistory.push('/dashboard');
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

export function postsUser (user, browserHistory) {
  return (dispatch) => {
    return postUser(user)
      .then((response) => {
        response.type = 'POST_USER';

        localStorage.setItem('Scrutinize.JWT.token', JSON.stringify(response.data));
        browserHistory.push('/dashboard');
        dispatch(response);
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