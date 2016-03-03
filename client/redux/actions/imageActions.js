import { getImage, postImage, updateImage, deleteImage } from '../api';

/* IMAGE API ACTIONS */

export function getsImage (image, browserHistory) {
  return (dispatch) => {
    return getImage(image)
      .then((response) => {
        var params = {
          type: 'GET_IMAGE',
          data: response.data
        };

        browserHistory.push(`/reports/${ image.id }`);
        dispatch(params);
      })
      .catch((error) => {
        if (error.status === 550) {
          var params = {
            type: 'GET_IMAGE',
            data: []
          };
        } else {
          var params = {
            type: 'ERROR_IMAGE',
            data: error
          };
        }

        dispatch(params);
      });
  };
}

export function postsImage (image) {
  return (dispatch) => {
    return postImage(image)
      .then((response) => {
        var params = {
          type: 'POST_IMAGE',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_IMAGE',
          data: error
        };

        dispatch(params);
      });
  };
}

export function updatesImage (image) {
  return (dispatch) => {
    return updateImage(image)
      .then((response) => {
        var params = {
          type: 'UPDATE_IMAGE',
          data: response.data
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_IMAGE',
          data: error
        };

        dispatch(params);
      });
  };
}

export function deletesImage (image) {
  return (dispatch) => {
    return deleteImage(image)
      .then((response) => {
        var params = {
          type: 'DELETE_IMAGE',
          data: image.id
        };

        dispatch(params);
      })
      .catch((error) => {
        var params = {
          type: 'ERROR_IMAGE',
          data: error
        };

        dispatch(params);
      });
  };
}