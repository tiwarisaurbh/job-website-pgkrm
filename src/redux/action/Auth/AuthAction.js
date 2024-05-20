import { FETCH_AUTH_INFO } from "../";


export const setAuthInfo = data => {
  return {
    type: FETCH_AUTH_INFO,
    data
  };
};