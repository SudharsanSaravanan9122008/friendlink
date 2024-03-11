import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, Button, Image } from "react-native";
import styles from "../components/styles";
import Icon from "react-native-vector-icons/AntDesign";
import auth from "@react-native-firebase/auth";
import { subscribeToGetMessagedUsers } from "../components/databaseHandler";


export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { messagedUsers: [] }
        this.subscriber = [];
    }

    componentDidMount() {
        subscribeToGetMessagedUsers(data => {
            this.subscriber.push(data)
            this.setState({ messagedUsers: this.subscriber })
        }, () => {
            this.subscriber = [];
        })
    }

    camelCaseName(name) {
        name = name.toLowerCase();
        arrayedName = name.split(" ");
        name = "";
        for (var i = 0; i < arrayedName.length; i++) {
            name += arrayedName[i][0].toUpperCase() + arrayedName[i].slice(1, arrayedName[i].length) + " "
        }
        name = name.slice(0, name.length - 1)
        return name;
    }

    getRecipientUID(participantsArray) {
        if (participantsArray[0] == auth().currentUser.uid) return participantsArray[1]
        else return participantsArray[0]
    }

    timestampToTime(timestamp) {
        let t = new Date();
        t.setTime(timestamp)
        tArray = t.toTimeString().split(" ")[0].split(":")
        return tArray[0] + ":" + tArray[1]
    }


    render() {
        return (
            <View style={styles.screen}>
                <View >
                    <Text style={styles.headingText}>
                        Home
                    </Text>
                    <View style={{ alignItems:"center",justifyContent:"center", flexDirection:"row"}}>
                        <TouchableOpacity style={[styles.buttonsNoMargin, {flexDirection:"row"}]} onPress={() => this.props.navigation.navigate("Settings")}>
                            <Icon name="setting" size={30} color="#ffffff" />
                            <Text>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    {this.state.messagedUsers.length !== 0 ? (
                        <FlatList
                            data={this.state.messagedUsers}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.userListContainer} onPress={() => this.props.navigation.navigate("Chat", { ...item, preload: { name: item.participants.name, profilePhotoLink: item.participants.profilePhotoLink } })}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.navigate("ProfilePhoto", { link: item.participants.profilePhotoLink, name: item.participants.name }) }}>
                                        <Image style={{ height: "70%", aspectRatio: 1, margin: 10, borderRadius: 90 }} source={{ uri: item.participants.profilePhotoLink }} />
                                    </TouchableOpacity>
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                            <Text style={styles.userName}>{item.participants.name}</Text>
                                            {/* <Text style={[styles.lastSeen, {marginLeft: 100}]}>{this.timestampToTime(item.lastUpdated.seconds)}</Text> */}
                                        </View>
                                        <Text style={styles.lastMessage}>{item.lastMessage.content}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <Text>No messages yet</Text>
                    )}

                </View>
            </View>
        )
    }
}

