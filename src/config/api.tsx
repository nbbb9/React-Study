/* eslint-disable */
//해당 페이지는 나중에 진행

import axios, { AxiosError } from "axios";

export const baseURL = "http://localhost:8080/api/v1/reactstudy";//변경 필

//Axios 인스턴스 생성
const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use(
    
);