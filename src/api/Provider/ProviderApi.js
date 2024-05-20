import Axios from '../index'

const schema = '/providers'

const createProvider = async (provider) => {
    return (await Axios.post(schema, provider ,{
        headers:{
            secured:true
        }
    })).data
}

const getProvider = async(userId) => {
    return (await Axios.get(schema + `/${userId}`)).data
}

export default { createProvider , getProvider}