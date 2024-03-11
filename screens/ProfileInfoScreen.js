import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../components/styles";
import Icon from 'react-native-vector-icons/Entypo';
import { generateLastActiveText, getDateToVerbalFormat, subscribeToDoc } from "../components/databaseHandler";
import { RFValue } from "react-native-responsive-fontsize";

export default class ProfileInfoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: null
        }
    }

    componentDidMount() {
        subscribeToDoc(this.props.route.params, (data) => {
            this.setState({ profileData: data })
        })
    }


    render() {
        if (this.state.profileData !== null) {
            return (
                <View style={styles.screen}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={styles.buttonsNoMargin} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-thin-left" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <Text style={styles.recipientNameLarge} numberOfLines={1} ellipsizeMode="tail">
                            {this.state.profileData.name}
                        </Text>
                    </View>
                    <View style={[styles.container, { justifyContent: "flex-start" }]}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ProfilePhoto", {name: this.state.profileData.name, link: this.state.profileData.profilePhotoLink})}>
                            <Image style={{ width: RFValue(150), aspectRatio: 1 / 1, borderRadius: RFValue(150), marginHorizontal: RFValue(50), marginBottom: RFValue(20)}} source={{ uri: this.state.profileData.profilePhotoLink }} />
                        </TouchableOpacity>
                        <Text style={styles.bodyTexts}>{(this.state.profileData.info.isOnline ? "Online" : generateLastActiveText(this.state.profileData.lastActive))}</Text>
                        <View style={{ width: "100%", marginTop: RFValue(20) }}>
                            <Text style={styles.bodyTextsLeftAligned}>
                                {"Email ID:" + this.state.profileData.email + "\n\n"}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

