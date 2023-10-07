import axios from 'axios';

const ip = '' //utilizar ip

export default axios.create({
     baseURL: `http://${ip}:3001`
});

