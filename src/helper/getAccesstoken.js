const getAccessToken = () =>
  localStorage.getItem('token') ? localStorage.getItem('token'): '';
export default getAccessToken;
