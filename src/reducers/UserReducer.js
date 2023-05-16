import AsyncStorage from "@react-native-async-storage/async-storage";


const initialState = {
    common: {
        
    },
    user: {
        user: {
            balances_available: {
                Brasil: 0,
                Exterior: 0,
            },
        },
        balances: {
            balance: 0,
            total_balance: 0,
        },
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
            if (action && action.payload && action.payload.common) {
            AsyncStorage.setItem('token', action.payload.common);
            return{...state, token: action.payload.common};
            }
        break;
        case 'setUser':
            return{...state, user: action.payload.user};
        break;
        case 'setProperty':
            return{...state, property: action.payload.property};
        break;
    }

    return state;
};