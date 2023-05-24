import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = 'https://api.managertrading.com';

const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;
    
    switch(method){
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
        break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
        break;
    }

    let headers = {'Content-Type': 'application/json'};
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    let req = await fetch(fullUrl, {
        method,
        headers,
        body
    });

    let json = await req.json();
    return json;
}

export default {

    getToken: async () => {
        return await AsyncStorage.getItem('token');
    },
    
    validateToken: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/account/identify', {}, token);
        return json;
    },

    login: async (email, password) => {
        let json = await request('post', '/account/signin', {email, password});
        return json;
    },

    getUser: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/account/identify', {}, token);
        return json;
    },

    logout: async () => {
        await AsyncStorage.removeItem('token');
    },

    updatePassword: async (newPassword, password) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/account/update-password', {newPassword, password}, token);
        return json;
    },
    updateProfile: async ( data ) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/account/update', data, token);
        return json;
    },
    updateBankAccount: async ( data ) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/account/bank-account', data, token);
        return json;
    }
    
    }
