import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../components/styles";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth";
import { ifUserExist } from "../components/databaseHandler";

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initializing: true,
            user: null
        }
    }

    onAuthStateChanged(user) {
        this.setState({ user: user });
        if (this.state.initializing) this.setState({ initializing: false })
    }

    async onGoogleButtonPress() {
        const { idToken } = await GoogleSignin.signIn();
        const GoogleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(GoogleCredential);
    }

    componentDidMount() {
        const subscriber = auth().onAuthStateChanged((user) => { this.onAuthStateChanged(user) });
        if (this.state.user) {
            ifUserExist(() => { this.props.navigation.replace("Verify") }, () => { this.props.navigation.replace("CreateUser") });
        }
        return subscriber;
    }

    componentDidUpdate() {
        if (this.state.user) {
            ifUserExist(() => { this.props.navigation.replace("Verify") }, () => { this.props.navigation.replace("CreateUser") });
        }
    }

    render() {
        if (this.state.initializing) return null;
        return (
            <View style={styles.screen}>

                <Text style={styles.headingText}>
                    Login
                </Text>
                <View style={styles.container}>

                    {/* LoginButton */}
                    <TouchableOpacity style={styles.buttonsHorizontal} onPress={() => { this.onGoogleButtonPress() }}>
                        <Text style={styles.buttonTexts}>Login with{" "}</Text>
                        <Image source={require("../assets/google_icon.webp")} style={{ width: 25, height: 25 }} resizeMode="cover" />
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

