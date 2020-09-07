import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import Icon from 'react-native-vector-icons/FontAwesome5';
import Search from "../Components/Search"
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";
import Test from "../Components/Test";
import Mapit from "../Components/Mapit";
import Pinit from "../Components/Pinit";
import PinDetail from "../Components/PinDetail";


const Stack = createStackNavigator();

const SearchStackScreen = () => {
    return (
        <Stack.Navigator

            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9AC4F8",
                },
                headerTintColor: "yellow",
                headerBackTitle: "blue",
            }}
        >
            <Stack.Screen name="Searchit" component={Search} />
            <Stack.Screen name="FilmDetail" component={FilmDetail} />
        </Stack.Navigator>
    );
}

//const FavoriteStack = createStackNavigator();

const FavoriteStackScreen = () => {
    return (
        <Stack.Navigator

            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9AC4F8",
                },
                headerTintColor: "yellow",
                headerBackTitle: "blue",
            }}
        >
            <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorites' }} />
            <Stack.Screen name="FilmDetail" component={FilmDetail} options={{ title: 'Favorite Detail' }} />
        </Stack.Navigator>
    );
}

//const MapItStack = createStackNavigator();

const MapItStackScreen = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#9AC4F8",
                },
                headerTintColor: "green",
                headerBackTitle: "red",
            }}
        >
            <Stack.Screen
                headerMode="screen"
                name="Mapit"
                component={Mapit}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#9AC4F8",
                    },
                    headerTintColor: "green",
                    headerBackTitle: "blue",
                }}
            />
            <Stack.Screen
                name="Pinit"
                component={Pinit}
                options={{ headerTitle: 'Pinit and Save' }}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#9AC4F8",
                    },
                    headerTintColor: "black",
                    headerBackTitle: "blue",
                }}

            />
            <Stack.Screen
                name="PinDetail"
                component={PinDetail}
                options={{ headerTitle: 'Pin Detail' }}
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#9AC4F8",
                    },
                    headerTintColor: "black",
                    headerBackTitle: "blue",
                }}

            />
        </Stack.Navigator>
    );
}


export { SearchStackScreen, FavoriteStackScreen, MapItStackScreen };
