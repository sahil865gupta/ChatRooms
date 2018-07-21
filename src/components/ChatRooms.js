import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import {Header, List, ListItem} from 'react-native-elements';
import firebase from '../firebase/firebase';

class ChatRooms extends Component{

    static navigationOptions = ({navigation}) => {
        return {
            title : 'Chat Rooms'
        }
    }

    state = {
        rooms : []
    }

    componentDidMount = () => {
        this.firebaseRef = firebase.database().ref('room_names/');

        this.firebaseRef.on('value', (snapshot) => {
            let rooms = Object.keys(snapshot.val()).map(key => {
                // console.log(snapshot.val()[key].createdBy);
                return {
                        roomName : key,
                        createdBy : snapshot.val()[key].createdBy
                    };
            });
            // console.log(rooms);

            this.setState({ rooms : [ ...rooms ] })
            // console.log(this.state);
        });
    }

    renderRoomNames = () => {
        return this.state.rooms.map((item, i) => {
            return <ListItem
                        title = {item.roomName}
                        subtitle = {item.createdBy}
                        key = {i}
                        onPress = {() => this.props.navigation.navigate('chatRoom', { chat_room_name : item.roomName})}
                    />;
        });
    }

    render(){
        return (
            <ScrollView>
                {/*<Header
                    centerComponent={{ text: 'Chat Room', style: { color: '#fff' } }}
                />*/}
                <List>
                    {this.renderRoomNames()}
                </List>
            </ScrollView>
        );
    }

}

export default ChatRooms;