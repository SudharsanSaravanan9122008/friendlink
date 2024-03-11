import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../components/styles";
import Icon from 'react-native-vector-icons/Entypo';

export default class SettingsScreen extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.screen}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={styles.buttonsNoMargin} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-thin-left" size={30} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.headingText}>
                        Settings
                    </Text>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttons} onPress={()=>this.props.navigation.navigate("Logout")}>
                        <Text style={styles.buttonTexts}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

