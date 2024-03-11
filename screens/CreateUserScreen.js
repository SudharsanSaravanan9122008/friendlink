import React, { Component } from "react";
import { View, Text, Switch, TextInput, TouchableOpacity, Pressable } from "react-native";
import styles from "../components/styles";
import { createUserInDB } from "../components/databaseHandler";

export default class CreateUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationPin: "",
            confirmVerificationPin: "",
            passwordShown: false,
            disableButton1: true,
            disableButton2: true,
            send: false
        }
        this.verificationPin = 0;
    }
    checkConditions() {
        if (this.state.verificationPin.length < 4 ) {
            this.setState({ disableButton1: true });
        } else {
            this.setState({ disableButton1: false });
            if (this.state.confirmVerificationPin === this.state.verificationPin) {
                this.setState({ disableButton2: false });
            } else {
                this.setState({ disableButton2: true });
            }
        }

    }

    componentDidUpdate(){
        if(this.state.send){
            createUserInDB(this.state.verificationPin, ()=>{this.props.navigation.replace("Home")})
        }
    }
    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.headingTextShort}>
                    Setup your account
                </Text>
                <View style={styles.container}>
                    <TextInput placeholder="Enter Verification PIN" style={styles.textInput} placeholderTextColor={"lightgrey"} autoFocus={true} onChangeText={text => {
                        this.setState({ verificationPin: text });
                        this.checkConditions();
                    }}
                        textContentType="password" secureTextEntry={this.state.passwordShown ? false : true} keyboardType="numeric" />
                    {/* <TextInput placeholder="Confirm Verification PIN" style={styles.textInput} placeholderTextColor={"lightgrey"} onChangeText={text2 => {
                        this.setState({ confirmVerificationPin: text2 });
                        this.checkConditions();
                    }} textContentType="password" secureTextEntry={this.state.passwordShown ? false : true} keyboardType="numeric" /> */}
                    {/* {(this.state.verificationPin !== this.state.confirmVerificationPin) ?
                        (
                            <Text style={styles.warningTexts}>
                                {"Verification PIN is not matching"}
                            </Text>
                        ) : null
                    } */}
                    {(this.state.verificationPin.length < 4) ?
                        (
                            <Text style={styles.warningTexts}>
                                {"Verification PIN must be atleast 4 digits long"}
                            </Text>
                        ) : null
                    }
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.bodyTexts}>Show password{" "}</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={this.state.passwordShown ? '#3db8ff' : '#d6f0ff'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => { this.setState({ passwordShown: this.state.passwordShown ? false : true }) }}
                            value={this.state.passwordShown}
                        />
                    </View>
                    <Pressable style={styles.buttons} disabled={!this.state.disableButton1&&!this.state.disableButton2} onPress={()=>{this.setState({send:true})}} android_ripple={{color: "rgba(255,255,255,0.6", radius:20, foreground:true, borderless:true}}>
                        <Text style={styles.buttonTexts}>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
}

