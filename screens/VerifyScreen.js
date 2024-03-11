import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../components/styles";
import { onGetVerificationPin } from "../components/databaseHandler";

export default class VerifyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verificationPin: "",
            incorrect: false,
            request: false
        }
    }

    componentDidUpdate() {
        if (this.state.request) {
            onGetVerificationPin(this.state.verificationPin,
                () => {
                    this.props.navigation.replace("Home")
                },
                () => {
                    this.setState({ incorrect: true })
                })
            this.setState({ request: false })
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.headingText}>
                    Verify
                </Text>
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholder="Verification PIN" placeholderTextColor="lightgrey" onChangeText={(text) => this.setState({ verificationPin: text })} textContentType="password" secureTextEntry={true} autoFocus={true} keyboardType="numeric"></TextInput>
                    {
                        (this.state.incorrect) ?
                            (
                                <Text style={styles.warningTexts}>Verification PIN incorrect</Text>
                            ) : null
                    }
                    <TouchableOpacity style={[styles.buttonsStaticWidth, { width: "60%", marginTop: 40 }]} onPress={() => this.setState({ request: true })}>
                        <Text style={styles.buttonTexts}>Verify</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

