import { combineReducers } from "redux";
import User from "./User/UserReducer";
import Auth from './Auth/AuthReducer'

export default combineReducers({
  user: User,
  auth:Auth
});
