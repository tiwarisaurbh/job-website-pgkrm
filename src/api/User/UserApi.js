import Axios from '../index'

const schema = '/users'

const createUser = async (user) => {
    return (await Axios.post(schema, user ,{
        headers:{
            secured:false
        }
    })).data
}

const getUser = async (userId) => {
    return (await Axios.get(schema + `/${userId}`)).data
}

export default { createUser, getUser }