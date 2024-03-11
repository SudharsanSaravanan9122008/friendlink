import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../components/styles";
import Icon from 'react-native-vector-icons/Entypo';

export default class ProfilePhotoScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.screen}>
                <View style={{position:"absolute",  flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={styles.buttonsNoMargin} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="chevron-thin-left" size={30} color="#ffffff" />
                    </TouchableOpacity>
                    <Text style={styles.recipientNameLarge} >
                        {this.props.route.params.name}
                    </Text>

                    
                </View>
                <View style={{zIndex:-1, justifyContent:"center", alignItems:"center"}}>
                    <Image style={{ width: "100%", height: "100%" }} source={{ uri: this.props.route.params.link }} resizeMode="contain" />
                </View>
            </View>
        )
    }
}

