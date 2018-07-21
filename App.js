import React from 'react';
import { StyleSheet, StatusBar} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import GlobalChat from './src/components/GlobalChat';
import ChatRooms from './src/components/ChatRooms';
import ChatRoom from './src/components/ChatRoom';
import CreateChatRoom from './src/components/CreateChatRoom';
import Aux from './src/components/Aux';

export default class App extends React.Component {
  render() {

    const MainNavigator = createMaterialBottomTabNavigator({
      globalChat : { screen : GlobalChat },
      chatRooms : createStackNavigator({
        chatRooms : {screen : ChatRooms},
        chatRoom : {screen : ChatRoom}
      }),
      createChatRoom : {screen : CreateChatRoom}
    });

    return (
            <Aux>
              {/*<StatusBar hidden={true} />*/}
              <MainNavigator />
            </Aux>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
