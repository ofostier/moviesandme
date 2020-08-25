import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
//import films from "../Helpers/filmsData";
import FilmItem from "./FilmItem";
import {getFilmsFromApiWithSearchedText} from "../API/TMDPApi";

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ""
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false

        }
    }

    _searchTextInputChanged(text) {
        //console.log("changed text")
        //this.setState({ searchedText: text })
        this.searchedText = text
    }

    _searchFilm () {

        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, ()=> {
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)

            this._loadFilms()
        })
    }

    _loadFilms() {
        console.log(this.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            this.setState({ isLoading: true }) // Lancement du chargement
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [ ... this.state.films, ...data.results],
                    isLoading: false  // Arret du chargement
                })
            })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                    {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
                </View>
            )
        }
    }

    _displayDetailForFilm = (idFilm) => {
        console.log("Display id => " + idFilm)
        this.props.navigation.navigate("FilmDetail", {idFilm: idFilm})
    }

    render() {
        console.log("RENDER")
        return (
            // Ici on rend à l'écran les éléments graphiques de notre component custom Search
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilm()}
                />
                <Button style={styles.textinput} title='Rechercher' onPress={() => this._searchFilm()}/>
                <FlatList
                    //data={[{key: '1', title: 'Rudra'}, {key: '2', title: 'Shiva'}, {key: '3', title: 'Parvati'}]}
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        console.log("onEndReadched List")
                        if (this.page < this.totalPages) {
                            this._loadFilms()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
    },
    textinput: {
        //marginTop: 10,
        marginLeft: 1,
        marginRight: 1,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})



export default Search
