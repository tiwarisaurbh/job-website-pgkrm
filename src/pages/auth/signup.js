import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_dark from "../../assets/images/logo4.png";
import logo_light from "../../assets/images/logo4.png";


import {registerWithEmailAndPassword , auth} from "../../firebase/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import UserApi from "../../api/User/UserApi";

import {setUserInfo} from '../../redux/action/User/UserAction'

import { useDispatch } from 'react-redux' 
import AuthApi from "../../api/Auth/AuthApi";
import { setAuthInfo } from "../../redux/action/Auth/AuthAction";

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      navigate('/profile')
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

  const registerWithEmail = async () => {
    // TODO: CHECK FOR VALIDATION of EMAIL AND PASSWORD
    const emailUser = await registerWithEmailAndPassword(email, password)
    const idTokenResult = await emailUser.getIdTokenResult(true)

    const newUser = {
      firebaseId:emailUser.uid,
      email:emailUser.email,
      authType:'EMAIL'
    }

    await UserApi.createUser(newUser)
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
                  className="mx-auto h-[24px] block dark:hidden"
                  alt=""
                />
                <img
                  src={logo_light}
                  className="mx-auto h-[24px] dark:block hidden"
                  alt=""
                />
              </Link>
              <h5 className="my-6 text-xl font-semibold">Signup</h5>
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
                      onChange={(ev) => {setEmail(ev.target.value)}}
                      value={email}
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
                      onChange={(ev) => {setPassword(ev.target.value)}}
                      value={password}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center w-full mb-0">
                      <input
                        className="form-checkbox text-emerald-600 rounded w-4 h-4 me-2 border border-inherit"
                        type="checkbox"
                        value=""
                        id="AcceptT&C"
                      />
                      <label
                        className="form-check-label text-slate-400"
                        htmlFor="AcceptT&C"
                      >
                        I Accept{" "}
                        <Link to="#" className="text-emerald-600">
                          Terms And Condition
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="mb-4">
                    <input
                      type="button"
                      className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                      value="Register"
                      onClick={registerWithEmail}
                    />
                  </div>

                  <div className="text-center">
                    <span className="text-slate-400 me-2">
                      Already have an account ?{" "}
                    </span>{" "}
                    <Link
                      to="/login"
                      className="text-black dark:text-white font-bold"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
              <p className="mb-0 text-gray-400 font-medium">
                © {new Date().getFullYear()} PGRKAM. Designed by{" "}
                <Link
                  
                  target="_blank"
                  className="text-reset"
                >
                  Knowledge Crafters
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
