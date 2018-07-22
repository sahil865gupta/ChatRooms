import React, {Component} from 'react';
import {View, Text, TextInput, Alert, AsyncStorage} from 'react-native';
import {Header} from 'react-native-elements';
import firebase from '../firebase/firebase';

class CreateChatRoom extends Component{

    state = {
        text : '',
        username : ""
    }

    setUserName = async () =>{
        let username = await AsyncStorage.getItem('username');
        
        this.setState({ username : username });
        console.log("[CreateChatRoom]Username set to ", username);
    }

    componentWillMount = () => {

        this.setUserName();
    
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
                this.firebaseRef.child(this.state.text).update({ createdBy : this.state.username });
                Alert.alert('Room Created');
                this.setState({text : ""});
                this.props.navigation.navigate('chatRooms');
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