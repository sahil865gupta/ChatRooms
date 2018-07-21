import React, {Component} from 'react';
import {View, Text, TextInput, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import firebase from '../firebase/firebase';

class CreateChatRoom extends Component{

    state = {
        text : ''
    }

    createChatRoom = () => {
        this.firebaseRef = firebase.database().ref('room_names/');

        this.firebaseRef.once('value', (snapshot) => {
            if(snapshot.hasChild(this.state.text))
            {
                // console.log('Exists');
                Alert.alert('Room Name already exist');
            }
            else
            { 
                // console.log('Not Exists');
                this.firebaseRef.child(this.state.text).update({ createdBy : '' });
                Alert.alert('Room Created');
            }
        });

        // Alert.alert(this.state.text);

    }

    render(){
        return (
            <View>
                <Header
                    centerComponent={{ text: 'Create Chat Room', style: { color: '#fff' } }}
                />
                <TextInput 
                    style={{borderColor:'gray', borderWidth: 2, borderRadius:50 }}
                    onChangeText={(text)=>this.setState({text})}
                    onEndEditing={ this.createChatRoom }
                    value={this.state.text} 
                    placeholder="Enter Chat Room Name Here" />
            </View>
        );
    }

}

export default CreateChatRoom;