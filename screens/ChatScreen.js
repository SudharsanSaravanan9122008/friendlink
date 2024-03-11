import React, { Component } from "react";
import { View, Text,ActivityIndicator, TouchableOpacity, Dimensions, Image, KeyboardAvoidingView, Animated } from "react-native";
import styles from "../components/styles";
import Icon from 'react-native-vector-icons/Entypo';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { subscribeToDoc, generateLastActiveText, subscribeToMessages, sendMessage } from "../components/databaseHandler";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import auth from "@react-native-firebase/auth";

export default class ChatScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sendersInfo: null,
            preloadSendersInfo: this.props.route.params.preload,
            sendLock: true,
            messages: null,
            messageBoxText: "",
            isScrolledDownAtStartup: false,
            isScrolledDown: false,
            scrollPosY: 0,
            toScrollDown: true,
            contentHeight: 0,
            messageOptions: {
                enabled: false,
                messageKey: ""
            },
            animButtonPos: "",
            animButtonOpacity: 1,
        }
        this.animButtonPos = new Animated.ValueXY({ x: 10, y: 85 })
        this.animOppVal = new Animated.Value(1);
        this.messages = [];
        this.clear = false;
        this.textInputRef = React.createRef();
        this.scrollViewRef = React.createRef();
        this.enable = false;
        this.unhideAnimInfoState = "completed";
        this.hideAnimInfoState = "not-completed"
        this.hideAnim = Animated.timing(this.animButtonPos, {
            toValue: { x: -60, y: 85 },
            duration: 350,
            useNativeDriver: false
        })
        this.unhideAnim = Animated.timing(this.animButtonPos, {
            toValue: { x: 10, y: 85 },
            duration: 350,
            useNativeDriver: false
        })
        this.opacityHideAnim = Animated.timing(this.animOppVal, {
            toValue: 0,
            duration: 450,
            useNativeDriver: false
        })
        this.opacityUnhideAnim = Animated.timing(this.animOppVal, {
            toValue: 1,
            duration: 250,
            useNativeDriver: false
        })
        this.keyboardShowListener = null;
    }

    componentDidMount() {
        subscribeToDoc(this.props.route.params.participantUID, (data) => {
            this.setState({ sendersInfo: data });
        })
        subscribeToMessages(this.props.route.params.key, data => {
            this.messages.push(data);
            this.setState({ messages: this.messages, toScrollDown: true });
        }, () => {
            this.messages = []
        }, () => {
            this.messages = [];
            this.setState({ messages: this.messages })
        })
        this.animOppVal.addListener((state) => this.setState({ animButtonOpacity: state.value }));
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

    sendMessage() {
        jsonDoc = sendMessage(this.props.route.params.key, this.state.messageBoxText);
        this.messages = this.state.messages;
        this.messages.push({ ...jsonDoc, key: new Date().toDateString() });
        this.setState({ messages: this.messages });
        this.messages = []
        this.clear = true;
        this.setState({ toScrollDown: true })
    }

    componentDidUpdate() {
        if (this.state.messageBoxText === "" && this.state.sendLock !== true) {
            this.setState({ sendLock: true })
        } else if (this.state.messageBoxText !== "" && this.state.sendLock !== false) {
            this.setState({ sendLock: false })
        }
        if (this.enable) {
            if (this.clear) {
                this.setState({ messageBoxText: "" });
                this.textInputRef.current.clear();
                this.clear = false;
            }
            if (this.state.isScrolledDownAtStartup === false && (this.state.sendersInfo !== null && this.state.messages !== null)) {
                this.scrollViewRef.current.scrollToEnd({ animated: false });
                this.setState({ isScrolledDownAtStartup: true, contentHeight: this.state.scrollPosY })
            }
            if (this.state.toScrollDown) {
                this.scrollViewRef.current.scrollToEnd({ animated: true });
                this.setState({ toScrollDown: false })
            }
        }
    }

    oldGoToBottomButton() {
        return (!this.state.isScrolledDown) ?
            (
                <TouchableOpacity style={{ backgroundColor: "lightgrey", borderRadius: 90, right: 10, bottom: 85, position: "absolute" }} onPress={() => { this.setState({ toScrollDown: true }) }}>
                    <IconMCI name="chevron-down" color="black" size={40} />
                </TouchableOpacity>
            ) : null
    }

    handleScroll(event) {
        const offsetY = Math.round(event.nativeEvent.contentOffset.y);
        const contentHeight = Math.round(event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height);
        this.setState({ scrollPosY: offsetY, contentHeight: contentHeight, isScrolledDown: (offsetY === contentHeight) });
        if (this.unhideAnimInfoState === "completed" && (offsetY >= contentHeight)) {
            this.unhideAnimInfoState = "not-completed"
        }
        if (!(offsetY >= contentHeight) && this.unhideAnimInfoState === "not-completed") {
            this.animButtonPos.setValue({ x: 10, y: 125 });
            this.unhideAnim.start()
            this.opacityUnhideAnim.start()
            this.unhideAnimInfoState = "completed"
        } else if ((offsetY >= contentHeight)) {
            this.animButtonPos.setValue({ x: 10, y: 85 });
            this.hideAnim.start()
            this.opacityHideAnim.start();
            this.hideAnimInfoState = "completed"
        }
    }
    splitString(s, maxLength) {
        const words = s.split(' ');
        const result = [];
        let currentLine = '';

        for (const word of words) {
            if (currentLine.length + word.length <= maxLength) {
                currentLine += currentLine ? ' ' + word : word;
            } else {
                result.push(currentLine);
                currentLine = word;
            }
        }

        if (currentLine) {
            result.push(currentLine);
        }

        return [s];
    }


    render() {

        if (this.state.sendersInfo !== null && this.state.messages !== null) {
            this.enable = true;
            return (
                <View style={styles.screen}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={styles.buttonsNoMargin} onPress={() => this.props.navigation.replace("Home")}>
                            <Icon name="chevron-thin-left" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("ProfilePhoto", { link: this.state.sendersInfo.profilePhotoLink, name: this.state.sendersInfo.name }) }}>
                            <Image style={{ height: 50, aspectRatio: 1, margin: 10, borderRadius: 90 }} source={{ uri: this.state.sendersInfo.profilePhotoLink }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.recipientProfileInfoButton} onPress={() => this.props.navigation.navigate("ProfileInfo", this.props.route.params.participantUID)}>
                            <Text style={styles.recipientName} ellipsizeMode="tail" numberOfLines={1}>
                                {this.state.sendersInfo.name}
                            </Text>
                            <Text style={styles.lastSeen}>
                                {this.state.sendersInfo.info.isOnline ? "Online" : generateLastActiveText(this.state.sendersInfo.lastActive)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView behavior="height" style={[styles.container, { justifyContent: "flex-start", height: Dimensions.get('window').height - 205 }]}>
                        <View style={{ height: Dimensions.get('window').height - 205, width: "100%" }}>
                            <ScrollView ref={this.scrollViewRef} onScroll={(event) => this.handleScroll(event)}>
                                {this.state.messages.map((item, index) => (
                                    <TouchableOpacity key={index} onLongPress={() => { this.setState({ messageOptions: { enabled: true, messageKey: index } }) }}>
                                        <View style={{ width: "100%" }}>
                                            <View style={[{ alignSelf: item.sender === auth().currentUser.uid ? "flex-end" : "flex-start" }, item.sender === auth().currentUser.uid ? styles.messageTextSenderContainer : styles.messageTextRecipientContainer]}>
                                                <Text style={styles.messageText} >{item.content}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View style={{ zIndex: 10, margin: 10, position: "absolute", bottom: -5, backgroundColor: "#353535", borderTopStartRadius: 20, paddingTop: 0, borderTopEndRadius: 20, paddingBottom: 25, paddingHorizontal: 0, paddingTop: 5, width: Dimensions.get("window").width - 20, alignItems: "center" }}>
                            <View style={{ flexDirection: "row" }}>
                                <TextInput ref={this.textInputRef} inputMode="text" placeholder="Message" placeholderTextColor={global.darkMode ? "lightgrey" : "#404040"} style={styles.messageBox} onChangeText={text => {
                                    this.setState({ messageBoxText: text })
                                }} />
                                <TouchableOpacity style={styles.sendButtonContainer} onPress={() => !this.state.sendLock ? this.sendMessage() : null}>
                                    <IconMCI name={this.state.sendLock ? "send-lock" : "send"} size={30} color={global.darkMode ? "#ffffff" : "#000000"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            global.apiLevel > 26 ? (
                                <Animated.View style={[{ position: "absolute", zIndex: 11, right: this.animButtonPos.getLayout().left, bottom: this.animButtonPos.getLayout().top }]}>
                                    <TouchableOpacity style={{ backgroundColor: "lightgrey", borderRadius: 90 }} onPress={() => { this.setState({ toScrollDown: true }); this.hideAnim.start(); }}>
                                        <IconMCI name="chevron-down" color="black" size={40} />
                                    </TouchableOpacity>
                                </Animated.View>
                            ) : this.oldGoToBottomButton()

                        }
                    </KeyboardAvoidingView>
                </View>
            )
        }
        else {
            return (
                <View style={styles.screen}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={styles.buttonsNoMargin} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="chevron-thin-left" size={30} color="#ffffff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("ProfilePhoto", { link: this.state.preloadSendersInfo.profilePhotoLink, name: this.state.preloadSendersInfo.name }) }}>
                            <Image style={{ height: 50, aspectRatio: 1, margin: 10, borderRadius: 90 }} source={{ uri: this.state.preloadSendersInfo.profilePhotoLink }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.recipientProfileInfoButton} onPress={() => this.props.navigation.navigate("ProfileInfo", this.props.route.params.participantUID)}>
                            <Text style={styles.recipientName} ellipsizeMode="tail" numberOfLines={1}>
                                {this.state.preloadSendersInfo.name}
                            </Text>
                            <Text style={styles.lastSeen}>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                    <ActivityIndicator size="large" color={global.darkMode?"white":"#303030"} />
                        <View style={{ zIndex: 10, margin: 10, position: "absolute", bottom: -5, backgroundColor: "#353535", borderTopStartRadius: 20, paddingTop: 0, borderTopEndRadius: 20, paddingBottom: 25, paddingHorizontal: 0, paddingTop: 5, width: Dimensions.get("window").width - 20, alignItems: "center" }}>
                            <View style={{ flexDirection: "row" }}>
                                <TextInput ref={this.textInputRef} inputMode="text" placeholder="Message" placeholderTextColor={global.darkMode ? "lightgrey" : "#404040"} style={styles.messageBox} onChangeText={text => {
                                    this.setState({ messageBoxText: text })
                                }} />
                                <TouchableOpacity style={styles.sendButtonContainer} onPress={() => !this.state.sendLock ? this.sendMessage() : null}>
                                    <IconMCI name={this.state.sendLock ? "send-lock" : "send"} size={30} color={global.darkMode ? "#ffffff" : "#000000"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

