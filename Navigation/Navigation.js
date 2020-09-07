import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from "../Navigation/MainTab";


/**/


const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={MainTabs} />
        </Stack.Navigator>
    );
}

export default Navigation;
