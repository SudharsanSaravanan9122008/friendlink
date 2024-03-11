import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StyleSheet } from "react-native";
global.darkMode = true;

var styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: global.darkMode ? "#000000" : "#dddddd"
    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: global.darkMode ? "#141414" : "#c9c9c9",
        marginHorizontal: RFValue(10),
        padding: RFValue(10),
        marginBottom: RFValue(10)
    },
    headingText: {
        fontSize: RFValue(50),
        fontStyle: "normal",
        fontWeight: "200",
        textShadowColor: global.darkMode ? "white" : "black",
        textShadowRadius: RFValue(10),
        color: global.darkMode ? "white" : "black",
        alignSelf: "flex-start",
        paddingLeft: RFValue(20)
    },
    recipientName: {
        fontSize: RFValue(22),
        fontStyle: "normal",
        fontWeight: "300",
        textShadowColor: global.darkMode ? "white" : "black",
        textShadowRadius: RFValue(5),
        color: global.darkMode ? "white" : "black",
        alignSelf: "flex-start",
        paddingRight: 100

    },
    recipientNameLarge: {
        fontSize: RFValue(30),
        fontStyle: "normal",
        fontWeight: "200",
        textShadowColor: global.darkMode ? "white" : "black",
        textShadowRadius: RFValue(10),
        color: global.darkMode ? "white" : "black",
        alignSelf: "center",
        paddingRight: RFValue(10)
    },
    lastSeen: {
        fontSize: RFValue(16),
        fontStyle: "normal",
        fontWeight: "200",
        textShadowColor: global.darkMode ? "white" : "black",
        textShadowRadius: RFValue(2),
        color: global.darkMode ? "white" : "black",
        alignSelf: "flex-start",

    },
    headingTextShort: {
        fontSize: RFValue(40),
        fontStyle: "normal",
        fontWeight: "200",
        textShadowColor: global.darkMode ? "white" : "black",
        textShadowRadius: RFValue(10),
        color: global.darkMode ? "white" : "black",
        alignSelf: "flex-start",
        paddingLeft: RFValue(20),
        marginTop: RFValue(10)
    },
    buttons: {
        padding: RFValue(13),
        borderRadius: RFValue(40),
        backgroundColor: "rgba(128,128,128,0.3)",
        marginTop: RFValue(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsNoMargin: {
        padding: RFValue(8),
        borderRadius: RFValue(40),
        backgroundColor: "rgba(128,128,128,0.3)",
        alignItems: 'center',
        justifyContent: 'center',
        margin: RFValue(10)
    },
    buttonsStaticWidth: {
        paddingVertical: RFValue(13),
        borderRadius: RFValue(40),
        backgroundColor: "rgba(128,128,128,0.3)",
        marginTop: RFValue(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsHorizontal: {
        padding: RFValue(13),
        borderRadius: RFValue(40),
        backgroundColor: "rgba(128,128,128,0.3)",
        marginBottom: RFValue(15),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    buttonTexts: {
        color: global.darkMode ? "rgba(220, 220, 220, 0.9)" : "rgba(36,36,36,0.9)",
        fontSize: RFValue(20)
    },
    texts: {
        color: global.darkMode ? "white" : "black",
        fontSize: RFValue(30),
    },
    warningTexts: {
        color: "rgba(255, 0, 0, 0.6)",
        backgroundColor: global.darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        padding: RFValue(5),
        borderRadius: RFValue(10),
        fontSize: RFValue(15),
    },
    textInput: {
        backgroundColor: global.darkMode ? "rgba(255,255,255,0.1)" : "rgba(0, 0, 0, 0.3)",
        borderColor: "grey",
        borderWidth: RFValue(1),
        borderRadius: RFValue(20),
        width: RFPercentage(40),
        aspectRatio: 21 / 3,
        paddingLeft: RFValue(20),
        color: "lightgrey",
        marginBottom: RFValue(20)
    },
    horizontalContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    bodyTexts: {
        fontSize: RFValue(18),
        color: global.darkMode ? "lightgrey" : "darkgrey"
    },
    bodyTextsLeftAligned: {
        fontSize: RFValue(16),
        color: global.darkMode ? "lightgrey" : "darkgrey",
        alignSelf: "flex-start"
    },
    userListContainer: {
        backgroundColor: global.darkMode ? "rgb(30,30,30)" : "#ffffff",
        marginBottom: RFValue(4),
        borderRadius: RFValue(5),
        width: RFPercentage(60),
        aspectRatio: RFValue(5),
        flexDirection: "row",
        alignItems: "center"
    },
    userName: {
        fontSize: RFValue(20),
        color: global.darkMode ? "white" : "black",
        fontWeight: "bold"
    },
    recipientProfileInfoButton: {
        backgroundColor: global.darkMode ? "#131313" : "#cccccc",
        flexGrow: 1,
        marginRight: RFValue(20),
        borderTopStartRadius: RFValue(10),
        borderBottomStartRadius: RFValue(10),
        paddingHorizontal: RFValue(10),
    },
    messageBox: {
        backgroundColor: global.darkMode ? "rgba(255,255,255,0.1)" : "rgba(180, 180, 180, 1)",
        borderColor: "grey",
        borderWidth: RFValue(1),
        borderRadius: RFValue(20),
        width: RFPercentage(40),
        height: RFValue(40),
        paddingLeft: RFValue(20),
        color: global.darkMode ? "lightgrey" : "black",
    },
    sendButtonContainer: { aspectRatio: 1 / 1, justifyContent: "center", backgroundColor: global.darkMode ? "rgb(128, 128, 128)" : "rgb(200, 200, 200)", alignItems: "center", height: RFValue(40), borderRadius: 90 },
    lastMessage: {
        fontSize: RFValue(16),
        fontStyle: "normal",
        fontWeight: "300",
        color: global.darkMode ? "white" : "black",
        alignSelf: "flex-start",
    },
    messageTextRecipientContainer: {
        backgroundColor: global.darkMode ? "rgba(60,60,60, 0.7)" : "rgb(200,200,200)",
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        padding: 10,
        margin: 5,
    },
    messageTextSenderContainer: {
        padding: 10,
        margin: 5,
        marginLeft:100,
        borderRadius: 10,
        borderBottomRightRadius: 0,
        backgroundColor: global.darkMode ? "rgba(70,70,90, 1)" : "rgb(200,200,200)"
    },
    messageText: {
        color: global.darkMode ? "white" : "black",
    },
    messageContainer: {
        height: "90%"
    },
})

export default styles;