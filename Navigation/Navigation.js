//import {createStackNavigator, createAppContainer} from "react-navigation-stack"
import React from 'react'
import { StyleSheet, Image } from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import Search from "../Components/Search"
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";
import Test from "../Components/Test";
import Mapit2 from "../Components/Mapit2";
import Pinit from "../Components/Pinit";

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail
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
        screen: Mapit2,
        navigationOptions: {
            title: 'Mapit'
        }
    },
    Pinit: {
        screen: Pinit,
        navigationOptions: {
            title: 'Detail du Favori'
        }
    }
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
            screen: Mapit2,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../Images/ic-map.png')}
                        style={styles.iconmap}/>
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
