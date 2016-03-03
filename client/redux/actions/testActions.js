import { getTest, postTest, updateTest, deleteTest, postTestView } from '../api';

/* TEST API ACTIONS */

export function getsTest (test, browserHistory, index) {
  return (dispatch) => {
    return getTest(test)
      .then((response) => {
        var params = {
          type: 'GET_TEST',
          data: response.data
        };

        browserHistory.push(`/dashboard/tests/${ index }`);
        dispatch(params);
      })
      .catch((error) => {
        if (error.status === 550) {
          var params = {
            type: 'GET_TEST',
            data: []
          };
        } else {
          var params = {
            type: 'ERROR_TEST',
            data: error
          };
        }

        browserHistory.push(`/dashboard/tests/${ index }`);
        dispatch(params);
      });
  };
}

export function postsTest (test) {
  return (dispatch) => {
    return postTest(test)
      .then((response) => {
        var params = {
          type: 'POST_TEST',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_TEST',
          data: error
        };

        dispatch(params);
      });
  };
}

export function updatesTest (test) {
  return (dispatch) => {
    return updateTest(test)
      .then((response) => {
        var params = {
          type: 'UPDATE_TEST',
          data: response.data.update,
          index: response.index
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_TEST',
          data: error
        };

        dispatch(params);
      });
  };
}

export function deletesTest (test) {
  return (dispatch) => {
    return deleteTest(test)
      .then((response) => {
        var params = {
          type: 'DELETE_TEST',
          data: test.testId
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_TEST',
          data: error
        };

        dispatch(params);
      });
  };
}

export function postsTestView (location) {
  return (dispatch) => {
    return postTestView()
      .then((response) => {
        window.location = location;
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_TESTVIEW',
          data: error
        };

        dispatch(params);
      });
  };
}
