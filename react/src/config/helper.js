import axios from "axios"

export const baseUrl = "";

export const app_url = "http://localhost:3000"

export const axiosInstance = axios.create({
	baseURL: `/api`,
	headers: {
		'Content-Type': 'application/json',
	}
});


axiosInstance.interceptors.request.use(
	config => {
		config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
		return config;
	},
	error => {
		return Promise.reject(error);
	});

axiosInstance.interceptors.response.use(
	response => {
		return response
	},
	error => {
		return Promise.reject(error);
	}
);
