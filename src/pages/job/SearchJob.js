import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from '../../components/Navbar';
import Feature from '../../components/Feature';
import Footer from '../../components/Footer';
import JobGridsTwoComp from '../../components/job-grids-two-comp'
import {LuSearch} from "react-icons/lu"
import ExploreJob from '../../components/Explore-job';

const jobTypes = ['PRIVATE', 'GOVERNMENT']
const jobCategories = ['FULL TIME', 'PART TIME']
const salaryTypes = ['DAILY', 'WEEKLY', 'MONTHLY', 'HOURLY']
const experienceTypes = ['FRESHERS', 'EXPERIENCED']
const genders = ['MALE', 'FEMALE', 'ANY']

const disablityTypes = [
    'NO DISABILITY',
    'LEARNING DISABILITIES',
    'SPEECH DISABILITY',
    'HEALTH IMPAIRMENTS',
    'AUTISM',
    'INTELLECTUAL DISABILITIES',
    'DEVELOPMENT DELAY',
    'EMOTIONAL DISTURBANCE',
    'MULTIPLE DISABILITIES',
    'OTHERS',
  ]

  const qualificationTypes = [
    'High School Diploma',
    'General Certificate of Secondary Education (GCSE)',
    'High School Certificate',
    'Associate\'s Degree',
    'Bachelor\'s Degree (e.g., Bachelor of Arts, Bachelor of Science)',
    'Master\'s Degree (e.g., Master of Arts, Master of Science)',
    'Postgraduate Diploma',
    'Postgraduate Certificate',
    'Doctor of Philosophy (Ph.D.)',
    'Doctor of Education (Ed.D.)',
    'Doctor of Science (D.Sc.)',
    'Doctor of Business Administration (DBA)',
    'Doctor of Medicine (M.D.)',
    'Doctor of Dental Medicine (DMD)',
    'Doctor of Veterinary Medicine (DVM)',
    'Doctor of Pharmacy (Pharm.D.)',
    'Doctor of Jurisprudence (J.D.)'
  ]

export default function SearchJob() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState({})


    const onSearch = () => {
        setSearchParams(searchQuery, {replace:true}) 
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <>
            <Navbar navClass='justify-end nav-light' />
            <section className="relative w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-emerald-900/90"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Search Jobs</h3>
                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/">PGRKAM</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Job  List</li>
                    </ul>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-4 md:col-span-6">
                            <div className="shadow dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900 sticky top-20">
                                <form>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <label htmlFor="searchname" className="font-semibold">Search Job</label>
                                            <div className="relative mt-2">
                                                <LuSearch className="text-lg absolute top-[10px] start-3"/>
                                                <input onChange={(ev) => {setSearchQuery({...searchQuery, search:ev.target.value})}} name="search" id="searchname" type="text" className="form-input border border-slate-100 dark:border-slate-800 ps-10" placeholder="Search" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="font-semibold">Job Category</label>
                                            <select className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {jobCategories.map((value) => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>

                                        </div>

                                        <div>
                                            <label className="font-semibold">Job Type</label>
                                            <select onChange={(ev) => {setSearchQuery({...searchQuery, jobType:ev.target.value})}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {jobTypes.map((value) => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-semibold">Salary Type</label>
                                            <select onChange={(ev) => {setSearchQuery({...searchQuery, salaryType:ev.target.value})}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {salaryTypes.map((value) => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-semibold">Experience Type</label>
                                            <select onChange={(ev) => {setSearchQuery({...searchQuery, experienceType:ev.target.value})}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {experienceTypes.map((value) => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-semibold">Preferred Gender</label>
                                            <select onChange={(ev) => {setSearchQuery({...searchQuery, preferredGender:ev.target.value})}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {genders.map((value) => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-semibold">Required Qualification</label>
                                            <select onChange={(ev) => {setSearchQuery({...searchQuery, requiredQualification:ev.target.value})}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {qualificationTypes.map((value) => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>
                                        </div>
                                        </div>

                                        <div>
                                            
                                            <div className="block mt-2">
                                                <div>
                                                    <label className="inline-flex items-center">
                                                        <input type="checkbox"
                                                            className="form-radio border-gray-200 dark:border-gray-800 text-emerald-600 focus:border-emerald-300 focus:ring focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50"
                                                            name="radio-colors" value="1"
                                                            onChange={(ev) => {setSearchQuery({...searchQuery, requiredQualification:ev.target.checked})}}
                                                        />
                                                        <span className="ms-2 text-slate-400">Job for Disabled</span>
                                                    </label>
                                                </div>
                                        </div>

                                        <div>
                                            <input onClick={onSearch} type="button" className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full" value="Apply Filter" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <JobGridsTwoComp query={searchParams.toString()}/>
                    </div>
                </div>

                <Feature />

                <ExploreJob/>
            </section>
            <Footer />

        </>
    )
}

