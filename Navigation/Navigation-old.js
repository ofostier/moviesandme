//import {createStackNavigator, createAppContainer} from "react-navigation-stack"
import React from 'react'
import { StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from "react-navigation-stack";
//import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import Search from "../Components/Search"
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";
import Test from "../Components/Test";
import Mapit from "../Components/Mapit";
import Pinit from "../Components/Pinit";


const SearchStackNavigator = createStackNavigator({

    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Detail du film'
        }
    }
})

const FavoritesStackNavigator = createStackNavigator({
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            title: 'Favoris'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Detail du Favori'
        }
    }
})

const MapitStackNavigator = createStackNavigator({
    Mapit: {
        screen: Mapit,
        navigationOptions: ({ navigation }) =>({
            title: 'Mapit',
            headerLeft:<Icon name='map-marker' size={24} color='black' style={{paddingLeft:16}}
                             onPress={()=> navigation.toggleDrawer()}
            />
        }),

    },
    Pinit: {
        screen: Pinit,
        navigationOptions: {
            title: 'Detail du Pinit'
        }
    }
})

const DrawerNavigator = createDrawerNavigator({
        MapIt: { screen: MapitStackNavigator,
            navigationOptions: {
                drawerIcon: (
                    <Icon name="map" size={24}
                          resizeMode="contain"
                          style={{ width: 30, height: 30 }}
                    />
                ),

            },

        },
        Search: {screen: SearchStackNavigator,
            navigationOptions: {
                drawerIcon: (
                    <Icon name="search" size={24}
                           resizeMode="contain"
                           style={{ width: 30, height: 30 }}
                    />
                ),
            },
        }
    },
    {
        initialRouteName: 'MapIt',
        drawerBackgroundColor: '#fff7fc',
        statusBarAnimation: 'fade',
        drawerPosition: 'right',
        hideStatusBar: false,

        //contentComponent: Mapit, //Inject other screen in Drawer

    })


const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
                    return <Image
                        source={require('../Images/ic_search.png')}
                        style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
                }
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic_favorite.png')}
                        style={styles.icon}/>
                }
            }
        },
        Test: {
            screen: Test,
            navigationOptions: {
                tabBarIcon: () => { // On définit le rendu de nos icônes par les images récemment ajoutés au projet
                    return <Image
                        source={require('../Images/test2.png')}
                        style={styles.icon}/> // On applique un style pour les redimensionner comme il faut
                }
            }
        },
        Mapit: {
            screen: MapitStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic-map_marker.png')}
                        style={styles.iconmap}/>
                }
            }
        },
        Mapit2: {
            screen: DrawerNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Icon name="map-marked-alt" size={24}
                                 resizeMode="contain"
                                 style={{ width: 30, height: 30, color:'#f96567' }}
                    />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
)


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    },
    iconmap: {
        width: 25,
        height: 25
    }
})

export default createAppContainer(MoviesTabNavigator)
