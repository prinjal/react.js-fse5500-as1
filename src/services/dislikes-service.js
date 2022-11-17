import axios from "axios";

const BASE_URL = "http://localhost:8080";//process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitDisLikes = async (uid, tid) =>
    await api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);