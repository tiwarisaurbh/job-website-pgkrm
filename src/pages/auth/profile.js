import React, { forwardRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_dark from "../../assets/images/logo4.png";
import logo_light from "../../assets/images/logo4.png";

import {logInWithEmailAndPassword , signInWithGoogle, auth} from "../../firebase/firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import UserApi from "../../api/User/UserApi";

import {setUserInfo} from '../../redux/action/User/UserAction'

import { useDispatch, useSelector } from 'react-redux' 
import AuthApi from "../../api/Auth/AuthApi";
import { setAuthInfo } from "../../redux/action/Auth/AuthAction";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SeekerApi from "../../api/Seeker/SeekerApi";
import ProviderApi from "../../api/Provider/ProviderApi";

const profileTypes = [
    'SEEKER',
    'PROVIDER'
]

const genders = [
    'MALE',
    'FEMALE',
    'OTHERS'
]

const categories = ['GEN', 'GEN-EWS', 'OBC', 'SC/ST', 'OTHERS']

const martialStatuses = ['UNMARRIED', 'MARRIED', 'DIVORCED']

export default function Profile() {
  const [profileType, setProfileType] = useState(profileTypes[0])
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState(new Date())
  const [category, setCategory] = useState('')
  const [maritalStatus, setMartialStatus] = useState('')

  const [phoneNumber, setPhoneNumber] = useState('')
  const [designation, setDesignation] = useState('')

  const userState = JSON.parse(localStorage.getItem('user'))

  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  console.log(profileType)

  const createProfile = async () => {
    if(profileType == 'SEEKER'){
        const newSeeker = {
            userId:userState.id,
            fullName,
            gender,
            dob,
            category,
            maritalStatus
        }
        const seekerResponse = await SeekerApi.createSeeker(newSeeker)
        localStorage.setItem('seeker', JSON.stringify(seekerResponse))
        navigate('/')
    }else if(profileType == 'PROVIDER'){
      const newProvider = {
        userId:userState.id,
        fullName,
        phone:phoneNumber,
        email:userState.email,
        designation:userState.designation
      }
      
      const providerResponse = await ProviderApi.createProvider(newProvider)
      localStorage.setItem('provider', JSON.stringify(providerResponse))
      navigate('/')
    }
  }

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
        id="FullName"
        type="text"
        className="form-input mt-3 rounded-md"
        placeholder="Full Name"
        value={value}
        onClick={onClick}
        />
  ));
  
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
              <h5 className="my-6 text-xl font-semibold">Create Profile</h5>
              <form className="text-left">
                <div className="grid grid-cols-1">
                    <div className="mb-4 ltr:text-left rtl:text-right">
                      <label className="font-semibold">Profile Type</label>
                      <select onChange={(ev) => {setProfileType(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                        {profileTypes.map((value) => (
                            <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>
                        ))}
                      </select>
                    </div>
                    
                    {profileType == 'SEEKER' ? (
                        <>
                        <div className="mb-4 ltr:text-left rtl:text-right">
                        <label className="font-semibold" htmlFor="FullName">
                          Full Name:
                        </label>
                        <input
                          id="FullName"
                          type="text"
                          className="form-input mt-3 rounded-md"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(ev) => {setFullName(ev.target.value)}}
                        />
                      </div>
                      <div className="mb-4 ltr:text-left rtl:text-right">
                      <label className="font-semibold">Gender</label>
                      <select onChange={(ev) => {setGender(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                        {genders.map((value) => (
                            <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4 ltr:text-left rtl:text-right">
                      <label className="font-semibold">Category</label>
                      <select onChange={(ev) => {setCategory(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                        {categories.map((value) => (
                            <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4 ltr:text-left rtl:text-right">
                      <label className="font-semibold">Martial Status</label>
                      <select onChange={(ev) => {setMartialStatus(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                        {martialStatuses.map((value) => (
                            <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="mb-4 ltr:text-left rtl:text-right">
                        <label className="font-semibold" htmlFor="DOB">
                          Date of Birth
                        </label>
                        <br></br>
                        <DatePicker
                            selected={dob}
                            onChange={(date) => setDob(date)}
                            customInput={<ExampleCustomInput />}
                            dateFormat={'dd/MM/yyyy'}
                            scrollableYearDropdown
                            showYearDropdown
                            yearDropdownItemNumber={15}
                        />

                      </div>
                    
                      </>
                    ) : (
                      <>
                      <div className="mb-4 ltr:text-left rtl:text-right">
                          <label className="font-semibold" htmlFor="FullName">
                          Full Name:
                          </label>
                        <input
                          id="FullName"
                          type="text"
                          className="form-input mt-3 rounded-md"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(ev) => {setFullName(ev.target.value)}}
                        />
                      </div>

                      <div className="mb-4 ltr:text-left rtl:text-right">
                          <label className="font-semibold" htmlFor="FullName">
                          Phone Number:
                          </label>
                        <input
                          id="FullName"
                          type="text"
                          className="form-input mt-3 rounded-md"
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(ev) => {setPhoneNumber(ev.target.value)}}
                        />
                      </div>

                      <div className="mb-4 ltr:text-left rtl:text-right">
                          <label className="font-semibold" htmlFor="FullName">
                          Designation:
                          </label>
                        <input
                          id="FullName"
                          type="text"
                          className="form-input mt-3 rounded-md"
                          placeholder="Designation at your org."
                          value={designation}
                          onChange={(ev) => {setDesignation(ev.target.value)}}
                        />
                      </div>
                  </>
                    )}
                  



                  

                  

                  <div className="mb-4">
                    <input
                      type="button"
                      className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                      value="Create"
                      onClick={createProfile}
                    />
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
