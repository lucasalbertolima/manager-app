import React, {useState, useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import  Home  from './Home';
import  Statement  from './Statement';
import  Wallet  from './Wallet';
import  Profile  from './Profile';
import { Image } from "react-native";

import api from '../contexts/StateContext';
import { useStateValue } from '../contexts/StateContext'; 


const Tab = createBottomTabNavigator();

export default () => {

    return (
         <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon: () =>{
                    let ImgSource = null;

                    switch(route.name){
                        case 'Home':
                            ImgSource = require('../assets/home.png');
                        break;
                        case 'Statement':
                            ImgSource = require('../assets/rectangle-vertical-history.png');
                        break;
                        case 'Wallet':
                            ImgSource = require('../assets/wallet.png');
                        break;
                        case 'Profile':
                            ImgSource = require('../assets/user.png');
                        break;
                    }

                    return <Image source={ImgSource} style={{width:22, height:22}} />
                }
            })}
            tabBarOptions={{
                activeTintColor: '#000',
                style: {
                    padding: 10
                },
                labelStyle: {
                    fontSize: 13
                },
                keyboardHidesTabBar: true
            }}
         >
            <Tab.Screen name="Home" component={Home} options={{tabBarLabel: 'Início'}} />
            <Tab.Screen name="Statement" component={Statement} options={{tabBarLabel: 'Extrato'}} />
            <Tab.Screen name="Wallet" component={Wallet} options={{tabBarLabel: 'Carteira'}} />
            <Tab.Screen name="Profile" component={Profile} options={{tabBarLabel: 'Perfil'}} />
         </Tab.Navigator>
    )
}