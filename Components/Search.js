import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
import films from "../Helpers/filmsData";

class Search extends React.Component {
    render() {
        console.log({films})
        return (
            // Ici on rend à l'écran les éléments graphiques de notre component custom Search
            <View style={styles.main_container}>
                <TextInput style={styles.textinput} placeholder='Titre du film'/>
                <Button style={styles.textinput} title='Rechercher' onPress={() => {}}/>
                <FlatList
                    //data={[{key: '1', title: 'Rudra'}, {key: '2', title: 'Shiva'}, {key: '3', title: 'Parvati'}]}
                    data={films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Text>{item.title}</Text>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        marginTop: 40
    },
    textinput: {
        //marginTop: 10,
        marginLeft: 1,
        marginRight: 1,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5,
    }
})



export default Search
