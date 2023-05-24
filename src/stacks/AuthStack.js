import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PreloadScreen from '../screens/PreloadScreen';
import LoginScreen from "../screens/LoginScreen";
import MainTab from "../tabs/MainTab";
import ProfileDataScreen from "../screens/ScreensProfileTab/ProfileDataScreen";
import UpdatePasswordScreen from "../screens/ScreensProfileTab/UpdatePasswordScreen";
import UpdateProfileScreen from "../screens/ScreensProfileTab/UpdateProfileScreen";
import UpdateBankAccountScreen from "../screens/ScreensProfileTab/UpdateBankAccountScreen";

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
            <Stack.Screen
                name="UpdateProfileScreen"
                component={UpdateProfileScreen}
                options={{
                    title: 'Atualizar Perfil'
                }}
            />
            <Stack.Screen
                name="UpdateBankAccountScreen"
                component={UpdateBankAccountScreen}
                options={{
                    title: 'Atualizar Dados Bancários'
                }}
            />
        </Stack.Navigator>
    )
}