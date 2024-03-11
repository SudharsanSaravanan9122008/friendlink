import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../components/styles";
import auth from "@react-native-firebase/auth";
import { ifUserExist } from "../components/databaseHandler";

export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        if(auth().currentUser){
            ifUserExist(()=>this.props.navigation.replace("Verify"), ()=>this.props.navigation.replace("CreateUser"))
        }else{
            this.props.navigation.replace("Login")
        }
    }
    render() {
        return (
            <View style={styles.screen}>
                <Image style={{width:"100%", height:"100%"}} source={require("../assets/splash.png")} resizeMode="cover"/>
            </View>
        )
    }
}

