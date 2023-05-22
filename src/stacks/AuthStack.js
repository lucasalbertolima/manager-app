import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PreloadScreen from '../screens/PreloadScreen';
import LoginScreen from "../screens/LoginScreen";
import MainTab from "../tabs/MainTab";
import ProfileDataScreen from "../screens/ProfileDataScreen";
import UpdatePasswordScreen from "../screens/UpdatePasswordScreen";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="PreloadScreen"
                component={PreloadScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="MainTab"
                component={MainTab}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ProfileDataScreen"
                component={ProfileDataScreen}
                options={{
                    title: 'Dados Pessoais'
                }}
            />
            <Stack.Screen
                name="UpdatePasswordScreen"
                component={UpdatePasswordScreen}
                options={{
                    title: 'Alterar senha'
                }}
            />
        </Stack.Navigator>
    )
}