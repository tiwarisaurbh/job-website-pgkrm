import { FETCH_USER_INFO } from "../";


export const setUserInfo = data => {
  return {
    type: FETCH_USER_INFO,
    data
  };
};

// export const fetchGithubData = () => {
//   return dispatch => {
//     return axios
//       .get(apiUrl)
//       .then(response => {
//         dispatch(fetchData(response.data));
//       })
//       .catch(error => {
//         throw error;
//       });
//   };
// };
