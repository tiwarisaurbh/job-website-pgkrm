import { FETCH_AUTH_INFO } from "../../action/";

const DEFAULT_STATE = {
    tokenType:'',
    accessToken:'',
    refreshToken:'',
    expiresIn:''
}

export default function authReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_AUTH_INFO:
      return {...state,...action.data};
    default:
      return state;
  }
}
