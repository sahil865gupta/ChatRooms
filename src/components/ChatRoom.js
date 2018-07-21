import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import Aux from './Aux';
import Chat from './chat';

// title : 'Chat Room : ' + navigation.state.params.chat_room_name,

class ChatRoom extends Component{

    static navigationOptions = ({navigation}) => {
        return {
            header: null
        }
    }

    render(){
        return (
                <Aux>
                    <Header 
                        leftComponent = {<Icon onPress={() => this.props.navigation.navigate('chatRooms')} name='arrow-back' color='white' />}
                        centerComponent={{ 
                                            text: `Chat Room : ${this.props.navigation.state.params.chat_room_name}`,
                                            style: { color: '#fff'} 
                                        }}
                    />
                    <Chat roomName={this.props.navigation.state.params.chat_room_name}/>
                </Aux>
                );
    }

}

export default ChatRoom;