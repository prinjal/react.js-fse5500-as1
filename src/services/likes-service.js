import axios from "axios";

const BASE_URL = "http://fse5500nodejs-env.eba-xyptnjbh.us-east-1.elasticbeanstalk.com";
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const userTogglesTuitLikes = async (uid, tid) =>
    await api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);


export const findAllTuitsLikedByUser = async (uid) =>
    await api.get(`${USERS_API}/${uid}/likes`)
        .then(response => response.data);
