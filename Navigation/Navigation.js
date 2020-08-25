//import {createStackNavigator, createAppContainer} from "react-navigation-stack"
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Search from "../Components/Search"
import FilmDetail from "../Components/FilmDetail";

const SearchStackNavigator = createStackNavigator({
    Search: { // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
        screen: Search,
        navigationOptions: {
            title: 'Search'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Film Detail'
        }
    }
})

export default createAppContainer(SearchStackNavigator)
