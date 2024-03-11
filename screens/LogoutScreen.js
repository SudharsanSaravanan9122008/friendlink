import React, { Component } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styles from "../components/styles";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth";

export default class LogoutScreen extends Component {
    constructor(props) {
        super(props);
    }

    async signOut() {
        try {
            await GoogleSignin.revokeAccess();
            await auth().signOut();
            this.props.navigation.replace("Login");
        } catch (error) {
            Alert.alert(error.message);
        }
    }

    componentDidMount(){
        console.log(auth().currentUser.photoURL)
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.headingText}>
                    Logout
                </Text>
                <View style={styles.container}>
                    <Text style={styles.texts}>Are you sure, do want to logout of the session?</Text>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTexts} onPress={() => this.signOut()}>Logout</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

