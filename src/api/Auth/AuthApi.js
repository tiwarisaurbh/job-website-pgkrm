import Axios from '../index'

const schema = '/auth'

const login = async (data) => {
    return (await Axios.post(schema + '/login', data)).data
}

export default { login }