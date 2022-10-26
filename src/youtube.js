import axios from "axios";

const URL = process.env.REACT_APP_URL;
export const API = process.env.REACT_APP_API_KEY;
export const clientId = process.env.REACT_APP_CLIENT_ID;

export const youtube_seach = axios.create({
    baseURL: URL,
    params:{
        part: "snippet",
        maxResults: 50,
        key: API
    },
    headers: {}
})

export const youtube_subscrition = axios.create({
    baseURL: URL,
    params:{
        part: "snippet",
        myRating: 'like',
        maxResults: 50,
        key: API
    },
    headers: {}
})