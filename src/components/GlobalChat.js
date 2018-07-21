import React, {Component} from 'react';
import Chat from './chat';
import {View} from 'react-native';
import {Header} from 'react-native-elements';

import Aux from './Aux';

class GlobalChat extends Component{

    render(){
        return (
            <Aux>
                <Header centerComponent={{ text: 'GlobalChat', style: { color: '#fff'} }}/>
                <Chat globalChat={true}/>
            </Aux>
        );
    }
}

export default GlobalChat;