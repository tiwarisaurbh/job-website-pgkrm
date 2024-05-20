import Axios from '../index'

const schema = '/jobPosts'

const createJob = async (job) => {
    return (await Axios.post(schema, job ,{
        headers:{
            secured:true
        }
    })).data
}

const filterJobs = async (filter) => {

    return (await Axios.get(schema + "?" +filter, {
        headers:{
            secured:false
        }
    })).data
}

const getJob = async(userId) => {
    return (await Axios.get(schema + `/${userId}`)).data
}

export default { createJob , getJob, filterJobs}