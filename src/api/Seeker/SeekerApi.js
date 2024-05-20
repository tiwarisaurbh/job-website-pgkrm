import Axios from '../index'

const schema = '/seekers'

const createSeeker = async (seeker) => {
    return (await Axios.post(schema, seeker ,{
        headers:{
            secured:true
        }
    })).data
}

const getSeeker = async(userId) => {
    return (await Axios.get(schema + `/${userId}`)).data
}

export default { createSeeker , getSeeker}