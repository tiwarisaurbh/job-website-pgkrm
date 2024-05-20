import React, { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";
import Select, { components } from "react-select";
import { Link, useNavigate } from "react-router-dom";
import facebook_logo from "../../assets/images/company/facebook-logo.png";
import google_logo from "../../assets/images/company/google-logo.png";
import android from "../../assets/images/company/android.png";
import bg6 from "../../assets/images/hero/bg6.png";
import Bg5 from "../../assets/images/hero/bg5.jpg";

import Navbar from "../../components/Navbar";
import PopularCategories from "../../components/Popular-Categories";
import PopularJobsfour from "../../components/Popular-Jobs-four";
import BestCompanies from "../../components/Best-companies";
import Feature from "../../components/Feature";
import Card from "../../components/card";
import News from "../../components/News";
import Footer from "../../components/Footer";
import JobCounter from "../../components/Job-counter";
import { BiBriefcaseAlt2, BiCheckCircle } from "react-icons/bi";
import { PiMapPin } from "react-icons/pi";
// import { useHistory } from 'react-router-dom';
import ExploreJob from "../../components/Explore-job";
import MillionsJob from "../../components/Millions-job";
import JobBoardStatsSection from "../../components/jobboard";
import ChatBot from "react-simple-chatbot";
import { Segment } from "semantic-ui-react";

import {useSelector} from 'react-redux'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const jobTypes = ['PRIVATE', 'GOVERNMENT'].map((value) => ({value:value, label:capitalizeFirstLetter(value.toLowerCase())}))
const jobCategories = ['FULL TIME', 'PART TIME'].map((value) => ({value:value, label:capitalizeFirstLetter(value.toLowerCase())}))
const salaryTypes = ['DAILY', 'WEEKLY', 'MONTHLY', 'HOURLY'].map((value) => ({value:value, label:capitalizeFirstLetter(value.toLowerCase())}))
const experienceTypes = ['FRESHERS', 'EXPERIENCED'].map((value) => ({value:value, label:capitalizeFirstLetter(value.toLowerCase())}))
const genders = ['MALE', 'FEMALE', 'ANY'].map((value) => ({value:value, label:capitalizeFirstLetter(value.toLowerCase())}))

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
  ].map((value) => ({value:value, label:capitalizeFirstLetter(value.toLowerCase())}))

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
  ].map((value) => ({value:value, label:capitalizeFirstLetter(value.toLowerCase())}))

export default function IndexFive() {
  const [showChatBot, setShowChatBot] = useState(false);
  const userState = useSelector(state => state.user)
  const authState = useSelector(state => state.auth)

  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState({})


  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position and update showChatBot accordingly
      const scrollPosition = window.scrollY;

      // Set a threshold for when to show the ChatBot (adjust as needed)
      const threshold = 500;

      if (scrollPosition > threshold) {
        // setShowChatBot(true);
      } else {
        setShowChatBot(false);
      }
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Detach the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [isOpen, setOpen] = useState(false);
  const steps = [
    {
      id: "0",
      message: "Welcome to PGKRAM Website! i am Your Guide",
      trigger: "1",
    },
    {
      id: "1",
      message: "please enter your name ",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Hi {previousValue},How may can i help you",
      trigger: "4",
    },
    {
      id: "4",
      user: true,
      trigger: "5",
    },
    {
      id: "5",
      message:
        "you want to apply for  {previousValue},then you should tell me that you have ",
      trigger: "6",
    },
    {
      id: "6",
      options: [
        { value: "Login", label: "Login", trigger: "Login" },
        { value: "Singup", label: "Singup", trigger: "Singup" },
        { value: "Postjob", label: "Postjob", trigger: "Postjob" },
      ],
    },
    {
      id: "Postjob",
      component: (
        <div>
          To postt a job in <Link to="../job-post">Click Here</Link>.
        </div>
      ),
      end: true,
    },
    {
      id: "Login",
      component: (
        <div>
          To log in <Link to="../login">Click Here</Link>.
        </div>
      ),
      trigger: "7",
    },

    {
      id: "Singup",
      component: (
        <div>
          To Singup<Link to="../signup">Click Here</Link>.
        </div>
      ),
      end: true,
    },
    {
      id: "7",
      message: "hey you have succefully logged in go for applying job",
      end: true,
    },
  ];

  const serialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  const searchJob = () => {
    navigate('/search-job?' + serialize(searchQuery))
  }

  const [log, setlog] = useState(false);
  // const history = useHistory();
  const handleApplyJob = () => {
    // Check if the user is logged in (you need to implement your authentication logic)
    const isLoggedIn = true;

    // Redirect to the appropriate page based on the login status
    if (isLoggedIn) {
      setlog(true);
    } else {
      setlog(false);
    }
  };

  return (
    <>
      <Navbar navClass="justify-end nav-light" />
      <section className="relative flex py-36 md:h-screen h-auto items-center bg-[url('../../assets/images/hero/bg6.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute top-0 start-0 w-full h-full z-0 pointer-events-none overflow-hidden">
          <iframe
            title="iframe-1"
            src="https://player.vimeo.com/video/354421650?background=1&autoplay=1&loop=1&byline=0&title=0"
            className="absolute top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2  -translate-y-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vw]"
          ></iframe>

          <iframe
            title="iframe-2"
            src="https://www.youtube.com/embed/JsNvHJsufhI?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1"
            className="absolute top-1/2 start-1/2 ltr:-translate-x-1/2 rtl:translate-x-1/2  -translate-y-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vw]"
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-emerald-900/80"></div>
        <div className="container z-1">
          <div className="grid grid-cols-1 text-center mt-10 relative">
            <h4 className="lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 font-bold text-white">
              Got Talent ? <br /> Meet Opportunity
            </h4>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Fill Out The Form Given Below.
            </p>

            <div className="d-flex" id="reserve-form">
              <div className="md:w-5/6 mx-auto">
                <div className="lg:col-span-10 mt-8">
                  <div className="bg-white dark:bg-slate-900 border-0 shadow rounded-md p-3">
                    <form action="#">
                      <div className="registration-form text-dark text-start">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                          <div className="filter-search-form relative filter-border">
                            <BiBriefcaseAlt2 className="icons" />
                            <Select
                              className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                              placeholder="Job Type"
                              options={jobTypes}
                              onChange={(ev) => {setSearchQuery({...searchQuery,jobType:ev.value})}}
                            />
                          </div>

                          <div className="filter-search-form relative filter-border">
                            <PiMapPin className="icons" />
                            <Select
                              className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                              placeholder="Experience Types"
                              options={experienceTypes}
                              onChange={(ev) => {setSearchQuery({...searchQuery,experienceType:ev.value})}}
                            />
                          </div>

                          <div className="filter-search-form relative filter-border">
                            <PiMapPin className="icons" />
                            <Select
                              className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                              placeholder="Qualification"
                              options={qualificationTypes}
                              onChange={(ev) => {setSearchQuery({...searchQuery,requiredQualification:ev.value})}}
                            />
                           </div>
                          <div className="filter-search-form relative filter-border">
                            <PiMapPin className="icons" />
                            <Select
                              className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                              placeholder="Gender"
                              options={genders}
                              onChange={(ev) => {setSearchQuery({...searchQuery,preferredGender:ev.value})}}
                            />
                          </div>
                        </div>
                        <p
                          style={{
                            textAlign: "center",
                            width: "100%",
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          Or
                        </p>
                        <div className="filter-search-form relative filter-border">
                          <PiMapPin className="icons" />
                          <input
                            className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                            placeholder="Enter Job Title or Description"
                            onChange={(ev) => {setSearchQuery({...searchQuery,search:ev.target.value})}}
                          />
                        </div>
                      </div>

                      <input
                        type="button"
                        id="search"
                        name="search"
                        style={{ marginTop: 10 }}
                        className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white searchbtn submit-btn w-100"
                        value="Search"
                        onClick={searchJob}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-white/60">
                <span className="text-white">Popular Searches :</span> Designer,
                Developer, Web, IOS, PHP Senior Engineer
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <JobCounter />
        {/* <div className="right">
        <Segment floated="right">
         <ChatBot steps={steps}/>
        </Segment>
        </div> */}
        <div
          className="fixed bottom-0 right-0 p-4 z-50"
          style={{ right: "0", display: showChatBot ? "block" : "none" }}
        >
          <ChatBot steps={steps} />
        </div>

        <PopularCategories />
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId="S_CGed6E610"
          onClose={() => setOpen(false)}
        />
        <section
          className="py-24 w-full table relative bg-center bg-no-repeat bg-cover jarallax"
          data-jarallax
          data-speed="0.5"
          style={{ backgroundImage: "url(../../assets/images/hero/bg5.jpg)" }}
        >
          <div className="absolute inset-0 bg-slate-900/40"></div>
          <div className="container relative">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px]">
              <div>
                <h5 className="text-xl font-semibold text-dark">
                  Register for Candidate or User
                </h5>

                <ul className="list-none text-dark/50 mt-4">
                  <li className="mb-1 flex items-center">
                    <BiCheckCircle className="text-dark text-xl me-2" /> It has
                    survived not only five centuries
                  </li>
                  <li className="mb-1 flex items-center">
                    <BiCheckCircle className="text-dark text-xl me-2" /> There
                    are many variations of passages
                  </li>
                </ul>

                <div className="mt-4" onClick={handleApplyJob}>
                  <Link
                    to={log ? "/job-apply" : "/login"}
                    className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:border-emerald-600 text-white rounded-full"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>

              <div>
                <h5 className="text-xl font-semibold text-dark">
                  Register for Companies
                </h5>

                <ul className="list-none text-dark/50 mt-4">
                  <li className="mb-1 flex items-center">
                    <BiCheckCircle className="text-dark text-xl me-2" /> Many
                    desktop publishing packages
                  </li>
                  <li className="mb-1 flex items-center">
                    <BiCheckCircle className="text-dark text-xl me-2" />{" "}
                    Contrary to popular belief
                  </li>
                  <li className="mb-1 flex items-center">
                    <BiCheckCircle className="text-dark text-xl me-2" /> It is a
                    long established fact that a reader
                  </li>
                </ul>

                <div className="mt-4">
                  <Link
                    to="/job-post"
                    className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:border-emerald-600 text-white rounded-full"
                  >
                    Post Jobs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="relative md:pb-24 pb-16 overflow-hidden">
        <PopularJobsfour />
        <BestCompanies />
        <Feature />
        <JobBoardStatsSection />
        <News />

        <ExploreJob />
      </section>
      <Footer />
    </>
  );
}
