import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_dark from "../../assets/images/logo4.png";
import logo_light from "../../assets/images/logo4.png";

import {logInWithEmailAndPassword , signInWithGoogle, auth} from "../../firebase/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import UserApi from "../../api/User/UserApi";

import {setUserInfo} from '../../redux/action/User/UserAction'

import { useDispatch } from 'react-redux' 
import AuthApi from "../../api/Auth/AuthApi";
import { setAuthInfo } from "../../redux/action/Auth/AuthAction";
export default function Login() {
  const [user, loading, error] = useAuthState(auth);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      auth.currentUser.getIdToken(true).then((idToken) => {
        console.log(idToken)
      }) 
      navigate('/')
      //logout();
    }

  }, [user, loading]);


  const isNewUser = () => {
    return auth.currentUser.metadata.creationTime == auth.currentUser.metadata.lastSignInTime 
  }

  const loginWithApi = async (idTokenResult) => {
    const {token, user} = await AuthApi.login({firebaseAccessToken:idTokenResult})
    
    dispatch(setAuthInfo(token))
    dispatch(setUserInfo(user))

    

    localStorage.setItem('token', JSON.stringify(token))
    localStorage.setItem('user', JSON.stringify(user))
  }

  const loginWithEmail = async () => {
    // TODO: CHECK FOR VALIDATION of EMAIL AND PASSWORD
    const emailUser = await logInWithEmailAndPassword(email, password)
    const idTokenResult = await emailUser.getIdTokenResult(true)
    await loginWithApi(idTokenResult.token)
  }

  const onGoogleLogin = async () => {
    const googleUser = await signInWithGoogle()
    const idTokenResult = await googleUser.getIdTokenResult(true)

    if(isNewUser()){
      const newUser = {
        firebaseId:googleUser.uid,
        email:googleUser.email,
        authType:'SOCIAL_GOOGLE'
      }

      const apiUser = await UserApi.createUser(newUser)
      dispatch(setUserInfo(apiUser))
    } 

    await loginWithApi(idTokenResult.token)
  }

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      <div className="container">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
            <div className="p-6">
              <Link to="#">
                <img
                  src={logo_dark}
                  className="mx-auto h-[50px] block dark:hidden"
                  alt=""
                />
                <img
                  src={logo_light}
                  className="mx-auto h-[50px] dark:block hidden"
                  alt=""
                />
              </Link>
              <h5 className="my-6 text-xl font-semibold">Login</h5>
              <form className="text-left">
                <div className="grid grid-cols-1">
                  <div className="mb-4 ltr:text-left rtl:text-right">
                    <label className="font-semibold" htmlFor="LoginEmail">
                      Email Address:
                    </label>
                    <input
                      id="LoginEmail"
                      type="email"
                      className="form-input mt-3 rounded-md"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(ev) => {setEmail(ev.currentTarget.value)}}
                    />
                  </div>

                  <div className="mb-4 ltr:text-left rtl:text-right">
                    <label className="font-semibold" htmlFor="LoginPassword">
                      Password:
                    </label>
                    <input
                      id="LoginPassword"
                      type="password"
                      className="form-input mt-3 rounded-md"
                      placeholder="Password:"
                      value={password}
                      onChange={(ev) => {setPassword(ev.currentTarget.value)}}
                    />
                  </div>

                  <div className="flex justify-between mb-4">
                    
                    <p className="text-slate-400 mb-0">
                      <Link to="/reset-password" className="text-slate-400">
                        Forgot password ?
                      </Link>
                    </p>
                  </div>

                  <div className="mb-4">
                    <input
                      type="button"
                      className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                      value="Login"
                      onClick={loginWithEmail}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="button"
                      className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                      value="Google"
                      onClick={onGoogleLogin}
                    />
                  </div>

                  <div className="text-center">
                    <span className="text-slate-400 me-2">
                      Don't have an account ?
                    </span>{" "}
                    <Link
                      to="/signup"
                      className="text-black dark:text-white font-bold"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
              {error && error}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
