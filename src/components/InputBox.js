import React, {Component} from 'react';
import {Alert, View, Keyboard} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';

import firebase from '../firebase/firebase';

class InputBox extends Component{
    
    state = {
        text : ""
    }

    sendMsg = () => {

        if(this.state.text == "")
        {
            Keyboard.dismiss();
            return;
        }

        // Alert.alert("Message Sent" + this.state.text);
        this.firebaseRef = this.props.firebaseRef;

        this.firebaseRef.push({ text : this.state.text });
        // Alert.alert("Message Pushed");

        this.setState({ text : "" });

        Keyboard.dismiss();
    }

    render()
    {
        return (
                <View style={styles.viewStyle}>
                    <View style={styles.textBox}>
                        <SearchBar
                            lightTheme
                            round
                            noIcon
                            containerStyle={{width:'100%', borderRadius:50}}
                            onEndEditing={this.sendMsg}
                            onChangeText={(text)=>this.setState({text})}
                            placeholder="Type Here."
                            value={this.state.text}
                        />
                    </View>
                    <View style={styles.sendButton}>
                        <Icon onPress={this.sendMsg} containerStyle={{marginBottom : 10}} reverse color='skyblue' name="send" />
                    </View>
                </View>
                );
    }
}

export default InputBox;


const styles = {
    viewStyle : {
        flex : 1, 
        flexDirection : 'row',
        height:'20%',
        width : '100%',
        bottom : 0
    },
    textBox: {
        width: '80%',
      },
    sendButton : {
        width : '20%',
    }
  };