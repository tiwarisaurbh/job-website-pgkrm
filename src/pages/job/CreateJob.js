import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { DollarSign } from 'react-feather';
import { useState } from 'react';

import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import DraggableMarkerMap from '../../components/Map/DraggableMarkerMap';
import JobApi from '../../api/Job/JobApi';



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

export default function CreateJob() {
    const [jobTitle,setJobTitle] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [jobCategory, setJobCategory] = useState()
    const [jobType, setJobType] = useState('')
    
    const [address, setAddress] = useState('')
    const [addressState, setAddressState] = useState('')
    const [addressCity, setAddressCity] = useState('')

    const [lat, setLat] = useState('6.06677')
    const [lng, setLng] = useState('-39.76322')



    const [salaryType, setSalaryType] = useState('')
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')

    const [jobExperienceType, setJobExperienceType] = useState('')
    const [jobRequiredQualification, setJobRequiredQualification] = useState('')
    const [preferredGender,setPreferredGender] = useState('')
    const [jobForDifferentlyAbled, setJobForDifferentlyAbled] = useState(false)
    const userState = JSON.parse(localStorage.getItem('user'))

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const saveJobPost = async () => {
        const newJobPost = {
            jobTitle,
            providerId:userState.id,
            jobType,
            jobCategory,
            jobDescription,
            jobAddress:{
                address,
                state:addressState,
                city:addressCity
            },
            jobLocation:{
                latitude:lat,
                longitude:lng
            },
            salaryType,
            salary:{
                minimum:min,
                maximum:max
            },
            experienceType:jobExperienceType,
            preferredGender:preferredGender,
            jobForDifferentlyAbled:jobForDifferentlyAbled,
            requiredQualification:jobRequiredQualification,
    
        }

        const jobResponse = await JobApi.createJob(newJobPost)

        console.log(jobResponse)
    }

    return (
        <>
            <Navbar navClass="justify-end nav-light" />
            <section className="relative w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
                {/* ... (previous code) */}
                <div className="absolute inset-0 bg-emerald-900/90"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Job Post</h3>
                    </div>
                </div>
                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/index">Homepage</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Job Post</li>
                    </ul>
                </div>
            </section>

            <div className="relative">
                <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-slate-50 dark:text-slate-800">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            <section className="relative bg-slate-50 dark:bg-slate-800 lg:py-24 py-16">
                <div className="container">
                    <div className="lg:flex justify-center">
                        <div className="lg:w-2/3">
                            <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                                <form className="text-left">
                                    <div className="grid grid-cols-1">
                            

                                        {/* <h5 className="text-lg font-semibold">Job Details:</h5> */}
                                    </div>

                                    <div className="grid grid-cols-12 gap-4 mt-4">
                                    
                                    
                                        {/* ... Your job details form elements ... */}
                                    </div>

                                    <div className="grid grid-cols-1 mt-8">
                                        <h5 className="text-lg font-semibold">Job Information:</h5>
                                    </div>
                                    
                                        <div className="grid grid-cols-12 gap-4 mt-4">

                                        <div className="col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold" htmlFor="RegisterName">Job Title:</label>
                                            <input onChange={(ev) => {setJobTitle(ev.target.value)}} id="RegisterName" type="text" className="form-input border border-slate-100 dark:border-slate-800 mt-1" placeholder="Job Profile at an Organisation" />
                                        </div>
                                        <div className="col-span-12 ltr:text-left rtl:text-right">
                                            <label htmlFor="comments" className="font-semibold">Job Description:</label>
                                            <textarea onChange={(ev) => {setJobDescription(ev.target.value)}} name="comments" id="comments" className="form-input border border-slate-100 dark:border-slate-800 mt-1 textarea" placeholder="Write Job Description :"></textarea>
                                        </div>

                                        <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold">Job Type:</label>
                                            <select onChange={(ev) => {setJobType(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {jobTypes.map(value => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>

                                        </div>
                                               
                                        <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold">Job Category:</label>
                                            <select onChange={(ev) => {setJobCategory(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                            {jobCategories.map(value => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>

                                        </div>
                                        <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold">Salary Type:</label>
                                            <select onChange={(ev) => {setSalaryType(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                             {salaryTypes.map(value => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>

                                        </div>

                                        <div className="md:col-span-3 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold md:invisible md:block hidden">Min:</label>
                                            <div className="relative mt-1">
                                                <span className="w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 absolute top-0 start-0 overflow-hidden rounded">
                                                    <DollarSign className="w-4 h-4 absolute top-3 start-3"></DollarSign>
                                                </span>
                                                <input onChange={(ev) => {setMin(ev.target.value)}} type="number" className="form-input border border-slate-100 dark:border-slate-800 ps-12" placeholder="min" name="minsalary" />
                                            </div>
                                        </div>

                                        <div className="md:col-span-3 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold md:invisible md:block hidden">Max:</label>
                                            <div className="relative mt-1">
                                                <span className="w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 absolute top-0 start-0 overflow-hidden rounded">
                                                    <DollarSign className="w-4 h-4 absolute top-3 start-3"></DollarSign>
                                                </span>
                                                <input onChange={(ev) => {setMax(ev.target.value)}} type="number" className="form-input border border-slate-100 dark:border-slate-800 ps-12" placeholder="max" name="maxsalary" />
                                            </div>
                                        </div>
                                            {/* ... Your job details form elements ... */}
                                        </div>
                                    
                                    

                                    <div className="grid grid-cols-1 mt-8">
                                        <h5 className="text-lg font-semibold">Skill & Experience:</h5>
                                    </div>

                                    
                                        <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold">Experience Type:</label>
                                            <select onChange={(ev) => {setJobExperienceType(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {experienceTypes.map(value => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>
                                        </div>
                                        
                                        <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold">Required Qualification:</label>
                                            <select onChange={(ev) => {setJobRequiredQualification(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {qualificationTypes.map(value => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>
                                        </div>
                                    
                                    
                                    
                                    <div className="grid grid-cols-1 mt-8">
                                        <h5 className="text-lg font-semibold">Other:</h5>
                                    </div>

                                    
                                        <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold">Preferred Gender:</label>
                                            <select onChange={(ev) => {setPreferredGender(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                {genders.map(value => <option value={value}>{capitalizeFirstLetter(value.toLowerCase())}</option>)}
                                            </select>
                                        </div>
                                        
                                        <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                                        <input onChange={(ev) => {setJobForDifferentlyAbled(ev.target.checked)}} className="form-checkbox text-emerald-600 rounded w-4 h-4 me-2 border border-inherit" type="checkbox" value="" id="Rememberme" />
                                            <label className="form-check-label text-black-400" htmlFor="Rememberme">Job for Disable</label>
                                        </div>
                                    
                                
                                        <div className="grid grid-cols-1 mt-8">
                                        <h5 className="text-lg font-semibold">Address:</h5>
                                    </div>

                                    <div className="grid grid-cols-12 gap-4 mt-4">
                                        <div className="col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold" htmlFor="Address">Address:</label>
                                            <input onChange={(ev) => {setAddress(ev.target.value)}} id="Address" type="text" className="form-input border border-slate-100 dark:border-slate-800 mt-1" placeholder="Address" />
                                        </div>

                                        <div className="md:col-span-4 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold">State:</label>
                                            <select onChange={(ev) => {setAddressState(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                <option value="NY">New York</option>
                                                <option value="MC">North Carolina</option>
                                                <option value="SC">South Carolina</option>
                                            </select>

                                        </div>

                                        <div className="md:col-span-4 col-span-12 ltr:text-left rtl:text-right">
                                            <label className="font-semibold">City:</label>
                                            <select onChange={(ev) => {setAddressCity(ev.target.value)}} className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1">
                                                <option value="CAL">California</option>
                                                <option value="TEX">Texas</option>
                                                <option value="FLO">Florida</option>
                                            </select>

                                        </div>

                                        <div className="col-span-12 ltr:text-left rtl:text-right">
                                            <DraggableMarkerMap/>
                                        </div>
                                    </div>

                                
                                        <div className="grid grid-cols-12 gap-4 mt-4">
                                            {/* ... Your address form elements ... */}
                                        </div>
                                    
                                    

                                    <div className="grid grid-cols-1 gap-4 mt-4">
                                        <div>
                                            <button
                                                type="button"
                                                id="submit"
                                                name="send"
                                                className="btn rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white"
                                                onClick={saveJobPost}
                                            >
                                                Post Now
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}