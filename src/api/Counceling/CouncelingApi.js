import Axios from '../index'

const schema = '/councelings'

const createCounceling = async (counceling) => {
    return (await Axios.post(schema, counceling ,{
        headers:{
            secured:true
        }
    })).data
}

const getCounceling = async(userId) => {
    return (await Axios.get(schema + `/${userId}`)).data
}

export default { createCounceling , getCounceling}