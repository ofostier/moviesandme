import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, Card, ListItem } from 'react-native-elements';
import uuid from "uuid-random";


const users = [
    {
        name: 'brynn',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
    {
        name: 'John',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
    },
]

class PinDetail extends React.Component {

    constructor(props) {
        super(props)

        this.idPin = null
        this.state = {
            markerDetail: undefined,
            uuid: undefined,
            isLoading: true
        }

    }

    componentDidMount() {

        this.uuid = this.props.route.params.idPin
        console.log("ROUTE PIN : ", this.props.route.params)

        this._loadPinInformation()

    }

    _loadPinInformation = async () => {

        var Datastore = require('react-native-local-mongodb')
            , db = new Datastore({ filename: 'mapPinData', autoload: true });

        let mark
        //this.mark = this.mark.bind(this)

        //db.loadDatabase(function (err) {    // Callback is optional
        // Now commands will be executed
        //db.findOne({"tag": 2}, function (err, docs) {
        mark = await db.findOne({"uuid": this.uuid}).exec( function (err, docs) {
            console.log('LOAD MARKER : ', docs) //[0].location.userLocation)
            return docs
        })

        //})

        //console.log("DOC LM : ", mark)

        this.setState({
            markerDetail: mark,
            uuid:mark.uuid
        }, () => console.log("STATE MARKER LIST CHARGED "))

    }

    _displayLoading() {
        if (this.state.isLoading) {
            // Si isLoading vaut true, on affiche le chargement à l'écran
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayDetail = () => {

        const { markerDetail } = this.state
        if (markerDetail != undefined) {

            return (
                <View>
                    <Image style={styles.image_title}
                           source={require('../Images/skull_head.jpg')}
                    ></Image>
                    <Image
                        style={styles.image_tag}
                        source={require("../Images/ic-fire.png")}
                    ></Image>
                    <ScrollView>
                        <Card style={styles.card_container}>
                            <Card.Title>{markerDetail.name}</Card.Title>
                            <Card.Divider/>
                            {
                               // <Card.Image source={require('../Images/skull_head.jpg')}/>
                            }
                            <Text style={{marginBottom: 10}}>
                                {markerDetail.comment}
                            </Text>
                        </Card>
                        <ScrollView style={styles.box1}>

                            <Text style={styles.address_title}>PIN ADDRESS :</Text>
                            <Text style={styles.address_content}>{markerDetail.location.userLocation}</Text>
                            <Icon
                                style={styles.image_goto}
                                name="car-side"
                                size={13}
                            />
                        </ScrollView>
                    </ScrollView>
                </View>
            )
        }

    }

    render() {
        //console.log("Component FilmDetail render !")
        //console.log(this.props)
        console.log("RENDER")

        return (
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayDetail()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
         flex: 1,
        //borderWidth: 1,
        //borderStyle: solid,
        //borderColor: "gold",
        backgroundColor: 'black',

    },
    image_title: {
        backgroundColor: 'grey',
        alignSelf: 'center',
        height: 170,
        width: "99%",
        borderWidth: 1,
        borderRadius: 20,
        margin: 3,
        //width: '100%',
        padding: 5,
        //aspectRatio: 1,
        resizeMode: 'cover'
    },
    image_tag: {
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 75,
        alignSelf: 'center',
        height: 50,
        width: 50,
        marginTop: -30,
        //width: '100%',
        //padding: 5,
        aspectRatio: 1,
        resizeMode: 'cover'
    },
    image_goto: {
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 75,
        //alignSelf: 'center',
        height: 40,
        width: 40,
        //marginTop: -30,
        //width: '100%',
        padding: 12,
        //aspectRatio: 1,
        //resizeMode: 'contain'
    },
    card_container: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#e5e3e3',
        margin: 10,
        //padding: 10
    },
    box1: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#e5e3e3',
        margin: 10,
        //padding: 10
    },
    address_title: {
        borderColor: "black",
        borderBottomWidth: 1,
        backgroundColor: '#e5e3e3',
        margin: 5,
        padding: 5
    },
    address_content: {
        borderBottomWidth: 1,
        backgroundColor: '#e5e3e3',
        margin: 5,
        padding:5
    },
    address_content: {
        borderBottomWidth: 1,
        backgroundColor: '#e5e3e3',
        margin: 5,
        padding:5
    },
    address_comment: {
        borderBottomWidth: 1,
        backgroundColor: '#e5e3e3',
        margin: 5,
        padding:5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default PinDetail
