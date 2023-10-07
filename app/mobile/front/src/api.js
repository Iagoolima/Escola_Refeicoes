  import axios from 'axios';

  const serverIP = ''; // Substitua pelo endereço IP do seu servidor

  const api = axios.create({
    baseURL: `http://${serverIP}:3001`,
  });

  export default api;