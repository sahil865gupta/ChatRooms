import React, {Component} from 'react';
import Chat from './chat';
import {View, AsyncStorage} from 'react-native';
import {Header} from 'react-native-elements';

import firebase from '../firebase/firebase';

import Aux from './Aux';

class GlobalChat extends Component{

    state = {
        username : ""
    }

    async componentWillMount(){
        
        let username = await AsyncStorage.getItem('username');
        
        if(username)
        {
            this.setState({ username : username });
            console.log(username);
        }
        else 
        {    
            console.log("No username Exists");

            this.firebaseRef = firebase.database().ref('usernames/');

            this.firebaseRef.once('value', (snapshot) => {
                let username = "";

                if(snapshot.exists())
                {
                    const usersNo = Object.keys(snapshot.val()).length;
                    usersNo += 1;
                    username = 'Guest' + usersNo;
                    this.firebaseRef.child(username).update({ id : usersNo });
                }
                else{
                    username = 'Guest1';
                    this.firebaseRef.child(username).update({ id : 1 });
                }

                AsyncStorage.setItem('username', username);
                this.setState({ username : username });
            });
        }

    }

    render(){
        return (
            <Aux>
                <Header centerComponent={{ text: 'GlobalChat', style: { color: '#fff'} }}/>
                <Chat globalChat={true}  />
            </Aux>
        );
    }
}

export default GlobalChat;