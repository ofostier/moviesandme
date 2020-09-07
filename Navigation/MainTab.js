//MainTabs.js
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchStackScreen, FavoriteStackScreen, MapItStackScreen } from './StackNavigator'



const Drawer = createDrawerNavigator();

function DrawerScreen() {
    return (
        <Drawer.Navigator initialRouteName="Mapit" drawerContent={() => <DrawerContent />}>
            <Drawer.Screen
                name="Mapit"
                component={MapItStackScreen}
                options={{
                    drawerIcon: config => <Icon
                        size={23}
                        name={Platform.OS === 'android' ? 'map-marked-alt' : 'map-signs'}></Icon>
                }}
            />
            <Drawer.Screen
                name="Search"
                component={SearchStackScreen}
                options={{
                    drawerIcon: config => <Icon
                        size={23}
                        name={Platform.OS === 'android' ? 'star' : 'star' } solid></Icon>
                }}
            />
        </Drawer.Navigator>
    );
}




const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9AC4F8",
                },
                headerTintColor: "yellow",
                headerBackTitle: "blue",
                Title: 'Welcome'
            }}
        >
            <Tab.Screen
                name='Searchit'
                component={SearchStackScreen}
                options={{
                    tabBarIcon: (tabInfo) => (
                        <Icon name="search" size={18} color={'red'} />
                    ),
                }}
            />
            <Tab.Screen
                name='Favorites'
                component={FavoriteStackScreen}
                options={{
                    tabBarIcon: (tabInfo) => (
                        <Icon name="heart" size={18} color={'red'} />
                    ),
                }}
            />
            <Tab.Screen
                name='Mapit'
                component={MapItStackScreen}
                options={{
                    tabBarIcon: (tabInfo) => (
                        <Icon name="map" size={18} color={'red'} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default MainTabs;
