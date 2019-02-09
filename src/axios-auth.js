import axios from 'axios';

const instanceAuth = axios.create({
    baseURL: ''
})

export default instanceAuth;