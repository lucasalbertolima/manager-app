import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PreloadScreen from '../screens/PreloadScreen';
import LoginScreen from "../screens/LoginScreen";
import MainTab from "../tabs/MainTab";

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
        </Stack.Navigator>
    )
}