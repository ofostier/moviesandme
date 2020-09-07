import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native'
import {concat} from "react-native-reanimated";
import iconMapTagList from '../Helpers/map_tag_icons'
import TagMapIcon from "./TagMapIcon";
import {connect } from 'react-redux';
//import {_uuidGenerator} from '../Components/UuidGenerator'
//import UUIDGenerator from 'react-native-uuid-generator';
import uuid from 'uuid-random'
import {getFilmDetailFromApi} from "../API/TMDPApi";
import Datastore from 'react-native-local-mongodb'

class Pinit extends React.Component {

    constructor(props) {
        super(props)

        const dbMongo = new Datastore({ filename: 'mapPinData' });
        //iconMapTagList[0].push("actif")
        const pinName = ""
        const pinComment = ""
        const mytag = []
        const pinData = []
        const dataTag =iconMapTagList.map((d, index) => { //d = object, index = index in array
            mytag.push('on')
        })

        this.state = {
            tagPin: [],
            uuid: uuid(),
            tabBut: [],
            styleBut: [],
            isStyle: false,
            tagList: mytag,
            pinDataList: [],
            isLoading: false
        }

        console.log("########## NEW SET UUID : ")
        console.log("UUID : ",this.state.uuid)
        //console.log("TAG LIST  : ",this.state.tagList)

    }

    componentDidMount() {

        //const uuid = {uuid()};

        //this._togglePinUuid();

        //const tagIndex = this.props.tagPin.findIndex(item => item.id === this.props.navigation.state.params.location.place_id)
        const pinIndex = this.props.tagPin.findIndex(item => item.id === this.state.uuid)
        if (pinIndex !== -1) { // Film déjà dans nos favoris, on a déjà son détail
            // Pas besoin d'appeler l'API ici, on ajoute le détail stocké dans notre state global au state de notre component
            this.setState({
                tagPin: this.props.tagPin[uuid]
            })
            return
        }


        /*
        else {
            console.log("on ajoute le UUID au TAGPIN")
            this._togglePinUuid(this.state.uuid)
            return
        }

         */

        const dataPin = [
            {
                'uuid':this.state.uuid,'tag':[]
            }]
        this.setState({
            tagPin: dataPin
        })

        //this._getDataWs()
    }

    _getDataWs() {

        console.log('######## WS')
        return fetch('http://2f51bb2bc3.nxcli.net/mymap_ws/index.php')
            .then((response) => response.json())
            .then((responseJson) => {
                return console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _togglePinUuid = (uuid) => {
        const action = { type: "TOGGLE_PINUUID XXX", value: this.state.uuid }
        this.props.dispatch(action)
    }

    _getimagePath(name) {

        //console.log(name)
        return '../Images/ic-tent.png'
    }

    _toggleTag = (id) => {

        this._togglePinUuid();

        let tmpToggle = this.state.tagList
        const findToggle = iconMapTagList.findIndex(item => item.id === id)

        tmpToggle[findToggle]== 'off' ? tmpToggle[findToggle]= 'on' : tmpToggle[findToggle]= 'off'

        this.setState({tagList:tmpToggle})
        //console.log('ACTION TOGGLE TAG : ',id, this.state.tagPin[0])

        //console.log('ACTION TOGGLE TAGLIST : ', this.state.tagList)
        const pinIndex = this.state.tagPin.findIndex(item => item.uuid === this.state.uuid)
        //console.log('FIND UUID : ', pinIndex)
        //console.log('FIND UUID : ', this.state.tagPin[pinIndex].tag)
        const tagIndex = this.state.tagPin[pinIndex].tag.findIndex(item => item === id)
        //console.log('FIND TAG : ', tagIndex)

        if (tagIndex === -1) {
            this.state.tagPin[pinIndex].tag.push(id)
            //this.state.tagPin[pinIndex].tag[id].push('off')
            //this.state.tagList[key]
        }
        else
        {
            this.state.tagPin[pinIndex].tag.splice(tagIndex,1)
        }

        console.log(this.state.tagPin)


    }

    _displayTag= () => {
        //console.log(iconMapTagList)

        //this._togglePinUuid();

        //console.log('#########################')
        //console.log('FIND BUTTON LOAD: ', this.state)
        const pinIndex = this.state.tagPin.findIndex(item => item.uuid === this.state.uuid)
        //console.log('FIND BUTTON pinIndex: ', pinIndex) //, this.state.tagPin)
        //const tagIndex = []
        //const tagButton = []
        //const tagTab = this.state.tagPin[pinIndex].tag
        //console.log('FIND BUTTON tagTab: ', tagTab)

        if (pinIndex !== -1) {
            //console.log('OK PIN', this.state.tagPin[pinIndex])

            return iconMapTagList.map((element,key) => {

                //const tagIndex = this.state.tagPin[pinIndex].tag.findIndex(item => item === element.id)
                //const tagIndex = this.state.tagList.findIndex(item => item === element.id)
                //const tagIndex = this.state.tagList.findIndex(item => item === element.id)

                //console.log('FIND BUTTON tagIndex : ',key, this.state.tagList)

                let butStyle = 'styles.tagButton_off'

                //console.log("DISPLAY_TAG : ", pinIndex)
                if (this.state.tagList[key] == "on") {
                    //this.state.tagPin[pinIndex].tag.push(id)
                    butStyle = 'styles.tagButton'
                }

                //tagButton.push(butStyle)
                //console.log('FIND BUTTON TAGBUTTON: ', tagButton)

                //console.log('FIND BUTTON tagIndex: ', tagIndex)
                //console.log('FIND BUTTON state : ', this.state)

                return (
                    <TouchableOpacity
                        style={styles.main_container_tag}
                        key={element.id}
                        ref={element.title}
                        onPress={() => this._toggleTag(element.id)}
                    >
                        <Image
                            source={element.img}
                            //style={this.state.isStyle === true ? styles.tagButton_off : styles.tagButton}
                            style={this.state.tagList[key] =='on' ? styles.tagButton : styles.tagButton_off}
                        />
                        <Text style={styles.tagTitle}>{element.title}</Text>
                    </TouchableOpacity>
                );
            });
        }
    }

    _saveState() {

        //console.log("PROPS : ", this.props.navigation.state.params.location)
        console.log("PROPS : ", this.props.route.params.location)
        console.log("STATE : ", this.state.tagPin)
        console.log('Pin INFO', this.pinName, this.pinComment)

        const pinIndex = this.state.tagPin.findIndex(item => item.uuid === this.state.uuid)

        this.pinData = [{
            'uuid':this.state.uuid,
            //'location':this.props.navigation.state.params.location,
            'location':this.props.route.params.location,
            'tag': this.state.tagPin[pinIndex].tag,
            'name': this.pinName,
            'comment': this.pinComment,
        }]

        console.log('pin INDEX : ', pinIndex)
        console.log('pinDATA : ', this.pinData)

        /*
        Finaly save to MongoDB
         */
        this._saveMongo()

        //console.log("THIS STATE : ",this.state)

       // const action = { type: "TOGGLE_TAG", value: this.pinData }
       // this.props.dispatch(action)
    }

    _pinNameTextInputChanged(text) {
        this.pinName = text
    }
    _pinCommentTextInputChanged(text) {
        this.pinComment = text
    }

    _saveMongo () {

        this.setState({isLoading: true})

        var Datastore = require('react-native-local-mongodb')
            , db = new Datastore({ filename: 'mapPinData' });

        let doc = this.pinData;

        db.loadDatabase(function (err) {    // Callback is optional
            // Now commands will be executed
        });

        db.insert(doc, (err, newDoc) => {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
            console.log("NEW DOC : ", newDoc)
            console.log("NEW DOC ERROR : ", err)

            this.setState({isLoading:false})
            //this.props.navigation.goBack()

        });

        //console.log('SAVE MONGO :',doc)
    }

    _loadMongo = async () => {

        this.setState({isLoading: true})

        console.log("IS LOADING")

        var Datastore2 = require('react-native-local-mongodb')
            , db = new Datastore2({ filename: 'mapPinData' });

        db.loadDatabase(function (err) {    // Callback is optional
            // Now commands will be executed
        });

        await db.find({}, (err, docs) =>{

            //console.log('LOADED MONGO :',docs)
            //console.log("LOADED DOC ERROR : ", err)
            console.log(docs)

            this.setState({isLoading:false})
        })



        //this.setState({isLoading: false})
    }

    _askClearMongo() {

        Alert.alert(
            'Take Care !',
            'Do you really want to clear all MongoDB DATA ?',
            [
                {text: 'NO', onPress: () => console.warn('NO Pressed'), style: 'cancel'},
                {text: 'YES', onPress: () => this._clearMongo()},
            ]
        );

    }
    _clearMongo(){
        var Datastore2 = require('react-native-local-mongodb')
            , db = new Datastore2({ filename: 'mapPinData' });

        db.loadDatabase(function (err) {    // Callback is optional
            // Now commands will be executed
            db.remove({}, { multi: true }, function (err, nbdocs) {

                console.log('REMOVE MONGO :',nbdocs)
                console.log("REMOVE DOC ERROR : ", err)
            });
        });


        // docs contains Mars and Earth
    }

    _displayLoading() {
        if (this.state.isLoading) {
            console.log("loading from state")
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                    <Text>Loading ...</Text>
                </View>
            )
        }
    }

    render() {
        //console.log(this.props.navigation.state.params.location)

        return (
            <View style={styles.main_container}>
                <View style={styles.info_container}>
                    <Text>{this.props.route.params.location.userLocation}</Text>
                    <Text>Coord : {this.props.route.params.location.userRegion.latitude},{this.props.route.params.location.userRegion.longitude}</Text>
                    <Text>UUID : {this.state.uuid}</Text>
                </View>
                <View style={styles.tag_container}>{this._displayTag()}</View>
                <View style={styles.form_container}>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Pin Name'
                        onChangeText={(text) => this._pinNameTextInputChanged(text)}
                        //onSubmitEditing={() => this._searchFilms()}
                    />
                    <TextInput
                        style={styles.textArea}
                        placeholder='Your comment'
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this._pinCommentTextInputChanged(text)}
                        //onSubmitEditing={() => this._searchFilms()}
                    />
                </View>
                <View style={styles.saveButton_container}>
                    <Button
                        style={styles.saveButton}
                        title="SAVE YOUR PIN"
                        onPress={() => this._saveState()}
                    />

                </View>
                <View style={styles.saveButton_container}>
                    <Button
                        style={styles.saveButton}
                        title="RETRIEVE"
                        onPress={() => this._loadMongo()}
                    />

                </View>
                <View style={styles.saveButton_container}>
                    <Button
                        style={styles.saveButton}
                        title="CONTROL"
                        onPress={() => console.log(this.props)}
                    />

                </View>
                <View style={styles.saveButton_container}>
                    <Button
                        style={styles.saveButton}
                        title="CLEAR MONGODB"
                        onPress={() => this._askClearMongo()}
                    />

                </View>

                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: 'yellow',
        //alignContent: 'center',
        //justifyContent: 'space-between',
        //alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },
    info_container: {
        backgroundColor: '#CCCCCC',
        alignContent: 'center',
        //justifyContent: 'flex-end'
    },
    tag_container: {
        backgroundColor: '#FFCCCC',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        opacity:1
    },
    saveButtonContainer: {
        alignSelf: 'flex-end'
    },
    saveButton: {
        fontWeight: 'bold',
        fontSize: 30,
        borderRadius: 100
    },
    main_container_tag: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        borderWidth:1,
        borderColor: '#000000',
        width:70
    },
    tagButton: {
        width:30,
        height:30,
        margin: 4,
        opacity:1
    },
    tagButton_off: {
        width:30,
        height:30,
        margin: 4,
        opacity:0.1
    },
    tagtitle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
    },
    textArea: {
        height: 100,
        justifyContent: 'flex-start',
        textAlignVertical:'top',
        backgroundColor:'red'
    },
    loading_container: {
        //position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        //backgroundColor: '#FFCCCC',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        opacity:1
    }
})

const mapStateToProps = (state) => {
    return {
        tagPin: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Pinit)

//export default Pinit
