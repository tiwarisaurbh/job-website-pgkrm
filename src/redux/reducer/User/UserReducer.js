import { FETCH_USER_INFO } from "../../action/";

const DEFAULT_STATE = {
    id:'',
    firebaseId:'',
    email:'',
    mobile:'',
    authType:'',
    role:'',
    isInformed:false,
    hasProfile:false,
    createdAt:''
}

export default function userReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_USER_INFO:
      return {...state,...action.data};
    default:
      return state;
  }
}
