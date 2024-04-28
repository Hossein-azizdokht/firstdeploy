import ADD_PERM from './permTypes';

//fetch success
export function addPermissions(data) {
  return {
    type: ADD_PERM,
    payload: data,
  };
}

//asunc action creator
export const storePermissionsData = (permData) => {
  
  return function (dispatch) {
    dispatch(addPermissions(permData));
  };
};
