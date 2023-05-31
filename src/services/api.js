import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = 'https://api.managertrading.com';

const dataAtual = new Date();
const year = dataAtual.getFullYear();
const month = dataAtual.getMonth() + 1;


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

    let headers = {'Content-Type': 'application/json', 'Accept': 'application/json, application/pdf, text/plain, */*',};
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

    postAutoReinvest: async (data) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/account/auto-reinvestment', data, token);
        return json;
    },

    getConfig: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/account/config', {}, token);
        return json;
    },

    getCdiHistoric: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/account/cdi-gains', {}, token);
        return json;
    },

    getQuotaHistoric: async (chosenSymbol) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', `/trade/incomes?index=0&length=31&order_by=date&symbol=${chosenSymbol}&asc=1&date_start=${year}-${month}-01&date_end=${year}-${month}-31`, {}, token);
        return json;
    },

    getDepositsHistoric: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/trade/deposit-requests?index=0&length=&order_by=created_at&type=all&asc=desc&date_start=&date_end=', {}, token);
        return json;
    },

    getHistoric: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/trade/transactions?index=0&length=&order_by=created_at&type=all&asc=desc&date_start=&date_end=', {}, token);
        return json;
    },

    getRescuesHistoric: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/trade/rescues?index=0&length=&order_by=created_at&type=all&asc=desc&date_start=&date_end=', {}, token);
        return json;
    },

    getSymbols: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/trade/symbols?active=1', {}, token);
        return json;
    },

    getWithdrawsHistoric: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/trade/withdraw-requests?index=0&length=&order_by=created_at&type=all&asc=desc&date_start=&date_end=', {}, token);
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
    },

    requestNewWithdraw: async ( data ) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/trade/request-withdraw', data, token);
        return json;
    },

    requestNewInternalTransfer: async ( data ) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/trade/internal-transfer?client_id=undefined', data, token);
        return json;
    },

    requestNewInvestiment: async ( data ) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/trade/invest?client_id=', data, token);
        return json;
    },

    requestNewDeposit: async ( data ) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/trade/request-deposit', data, token);
        return json;
    },

    requestNewDepositImage: async (transferId, imageData) => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/trade/send-receipt?transfer_id=${transferId}&client_id=`, imageData, token);
        return json; 
      }
      
    
    }
