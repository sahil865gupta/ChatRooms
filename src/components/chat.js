import React, {Component} from 'react';
import {ScrollView, Text, View, KeyboardAvoidingView, Platform, AsyncStorage} from 'react-native';
import {Header} from 'react-native-elements';

import firebase from '../firebase/firebase';

import InputBox from './InputBox';


class chat extends Component{
    
    state = {
        username : "",
        msg : [],
        data : {}
    }

    setUserName = async () =>{
        let username = await AsyncStorage.getItem('username');
        
        this.setState({ username : username });
        console.log("Username set to ", username);
    }

    componentWillMount = () => {

        this.setUserName();

        if(this.props.globalChat == true)
        {
            this.firebaseRef = firebase.database().ref('/global_chat');
            console.log('Global');
        }
        else{
            this.firebaseRef = firebase.database().ref('/room_chat/' + this.props.roomName);
            console.log('Room', this.props.roomName);
        }
        this.firebaseRef.on('value', (snapshot)=>{
            // console.log(snapshot);
            // this.setState({ data : snapshot.val() })
            // console.log(this.state.data);
            
            if(snapshot.exists())
            {
                let result = Object.keys(snapshot.val()).map(key => {
                    return snapshot.val()[key];
                })

                this.setState({ msg : result });
            }
            else{
                console.log("No Messages");
            }
            
            // console.log(this.state.msg);
        });
    }

    renderMsg = () => {

        return this.state.msg.map((item, i) => {

                                                if(item.username == this.state.username)          
                                                    return (<View key={i} style={{ flex:1, flexDirection:'row-reverse' }}>
                                                                {/*<Text 
                                                                    style={{ 
                                                                        backgroundColor:'#517fa4',
                                                                        width:'20%',
                                                                        padding:5,
                                                                        borderRadius:50,
                                                                        marginBottom:5
                                                                        }} 
                                                                >
                                                                    {item["username"]}
                                                                    </Text>*/}
                                                                <Text 
                                                                    style={{ 
                                                                        backgroundColor:'skyblue',
                                                                        width:'60%',
                                                                        padding:5,
                                                                        borderRadius:50,
                                                                        marginBottom:5
                                                                        }} 
                                                                >
                                                                    {item["text"]}
                                                                </Text>
                                                            </View>
                                                            );

                                                else
                                                    return (<View key={i} style={{ flex:1, flexDirection:'row' }}>
                                                                <Text 
                                                                    style={{ 
                                                                        backgroundColor:'#517fa4',
                                                                        width:'20%',
                                                                        padding:5,
                                                                        borderRadius:50,
                                                                        marginBottom:5
                                                                        }} 
                                                                >
                                                                    {item["username"]}
                                                                </Text>
                                                                <Text 
                                                                    style={{ 
                                                                        backgroundColor:'skyblue',
                                                                        width:'60%',
                                                                        padding:5,
                                                                        borderRadius:50,
                                                                        marginBottom:5
                                                                        }} 
                                                                >
                                                                    {item["text"]}
                                                                </Text>

                                                            </View>
                                                            );
                                                }
                                    )

    }

    render()
    {
        return (
                <KeyboardAvoidingView behavior="padding" enabled  style={{ height:'100%', width:'100%', flex:1, flexDirection:'column'}}
                    keyboardVerticalOffset={
                        Platform.select({
                        ios: () => 0,
                        android: () => 40
                        })()
                    }
                >
                    <ScrollView style={styles.container}
                        ref={ref => this.scrollView = ref}
                        onContentSizeChange={(contentWidth, contentHeight)=>{        
                            this.scrollView.scrollToEnd({animated: true});
                        }}
                    >
                        {this.renderMsg()}
                    </ScrollView>
                    <InputBox username={this.state.username} firebaseRef={this.firebaseRef}/>
                </KeyboardAvoidingView>
                );
    }
}

export default chat;

const styles = {
    container: {
      width: '100%',
      height : '75%'
    }
  };
