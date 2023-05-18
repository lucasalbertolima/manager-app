import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {
    token: {
        
    },
    user: {
        
    },
    client: {
        
    },
    transfer: {

    },
    invest: {
        
    },
    rescue: {

    },
    config: {
        
    }, 
    extract: {
        
    },
    performances: {
        
    },
    movements: {

    },
    userPerformance: {
        
    },
    symbols: {
        symbol: {
            id: 0, 
            symbol: '',
            quota: 0,
            minimum_investment: 0,
            balance_available: 0,
            region: '',
        }
    }

}

export default (state = initialState, action = {}) => {

    switch(action.type) {
        case 'setToken':
            if (action && action.payload && action.payload.token) {
            AsyncStorage.setItem('token', action.payload.token);
            return{...state, token: action.payload.token};
            }
        break;
        case 'setUser':
            if(user){
            return{...state, user: action.payload.user};
            }
        break;
        case 'setProperty':
            return{...state, property: action.payload.property};
        break;
    }

    return state;
};