import axios from "axios";
const instance = axios.create({
    timeout: 2000,
});



export default instance;