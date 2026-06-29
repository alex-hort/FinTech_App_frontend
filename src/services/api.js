import axios from 'axios';

const API_BAS_URL = "http://localhost:8090/api"

//create axios instance 

const api = axios.create({
    baseURL: API_BAS_URL,
    headers: {
        'Content-Type': 'application/json',
    }

})


//add token to request header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

//api methods

export const apiService = {

    saveAuthData: (token, roles) => {
        localStorage.setItem('token', token);
        localStorage.setItem('roles', JSON.stringify(roles));
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
    },
    hasRole: (role) => {
        const roles = localStorage.getItem('roles');
        return roles ? JSON.parse(roles).includes(role) : false;
    },
    isAuthenticated: () => {
        return localStorage.getItem('token') !== null;
    },
    //check if user is Admin
    isAdmin(){
        return this.hasRole('ADMIN');
    },
    //check if user is an Instructor
    isInstructor(){
        return this.hasRole('CUSTOMER');
    },
    //check if user is a Auditor
    isAuditor(){
        return this.hasRole('AUDITOR');
    },

    login:(body) => {
        return api.post('/auth/login', body);
    },
    register:(body) => {
        return api.post('/auth/register', body);
    },

    forgetPassword:(body) => {
        return api.post('/auth/forget-password', body);
    },
    resetPassword:(body) => {
        return api.post('/auth/reset-password', body);
    },

    getMyProfile: () => {
        return api.get('/auth/me');
    },

    //updatePassword
    updatePassword: (oldPassword, newPassword) => {
        return api.put('/users/update-password', {
            oldPassword,
            newPassword
        });
    },

    uploadProfilePicture: (file) => {
        const formData = new FormData();
        formData.append('file', file);

        return api.put('/users/profile-picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

    },

    //Account

    getMyAccount: () => {
        return api.get('/account/me');
    },

    //make a transfer
    makeTransfer: (transferData) => {
        return api.post('/transactions', transferData);
    },

    //get transaction for an account
    getTransactions:(accountNumber, page =0, size = 10) => {
        return api.get(`/transactions/${accountNumber}?page=${page}&size=${size}`);

    },

    //Auditor
    //get system totals
    getSystemTotals: () => {
        return api.get('/audit/totals');
    },

    //find user by email
    findUserByEmail: (email) => {
        return api.get(`/audit/users?email=${email}`);
    },

    //find account by account number
    findAccountByAccountNumber: (accountNumber) => {
        return api.get(`/audit/accounts?accountNumber=${accountNumber}`);
    },
    //get transactions by account number
    getTransactionsByAccountNumber: (accountNumber) => {
       return api.get(`/audit/transactions/by-account?accountNumber=${accountNumber}`)
    },
    //get transactions by id
    getTransactionById: (id) => {
        return api.get(`/audit/transactions/by-id?id=${id}`);
    }

}

export default api;



