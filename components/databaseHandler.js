import React, { useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

const userCollection = firestore().collection("users");
const messageCollection = firestore().collection("chats");

export async function ifUserExist(callBack, failCallback) {
    userCollection
        .where('googleUID', "==", auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach((data) => {
                callBack();
                global.userExistInDb = true;
            })
        })
        .finally(
            () => {
                if (global.userExistInDb !== true) {
                    failCallback();
                }
            }
        )
}

export async function createUserInDB(Pin, callBack) {
    userCollection
        .doc(auth().currentUser.uid)
        .set({
            name: auth().currentUser.displayName,
            googleUID: auth().currentUser.uid,
            email: auth().currentUser.email,
            profilePhotoLink: auth().currentUser.photoURL,
            verificationPIN: Pin,
            info:{
                isOnline: true
            },
            lastActive: Date.now()
        })

    callBack();
}

export async function onGetVerificationPin(pin, callback, failCallback) {
    userCollection
        .doc(auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.data().verificationPIN === pin) {
                callback()
            } else {
                failCallback()
            }
        })
}

export async function getUsersList(callBack) {
    userCollection
        .get()
        .then(data => data.forEach(doc => callBack(doc.data().username)))
}

export async function getUserData(uid, callBack) {
    userCollection
        .doc(uid)
        .get()
        .then(
            querySnapshot => {
                callBack(querySnapshot.data())
            }
        )
}

export async function getUserDocID(callBack) {
    callBack(auth().currentUser.uid)
}

export async function getGivenUserDocID(uid, callBack) {
    callBack(uid);
}

export async function setLastSeen() {
    getUserDocID(
        (docID) => {
            userCollection
                .doc(docID)
                .update({
                    lastActive: Date.now()
                })
        }
    )
}

export async function setOnline() {
    getUserDocID(
        (docID) => {
            userCollection
                .doc(docID)
                .update(
                    {
                        info: {
                            isOnline: true
                        }
                    }
                )
        }
    )
}

export async function setOffline() {
    getUserDocID(
        (docID) => {
            userCollection
                .doc(docID)
                .update(
                    {
                        info: {
                            isOnline: false
                        }
                    }
                )
        }
    )
}

export async function subscribeToDoc(uid, callBack) {
    userCollection.doc(uid).onSnapshot(snapshot => {
        callBack(snapshot.data())
    })
}

export async function updateProfilePhoto() {
    getUserDocID(
        docID => {
            userCollection
                .doc(docID)
                .update(
                    {
                        profilePhotoLink: auth().currentUser.photoURL
                    }
                )
        }
    )
}

export async function getMessagedUsers(callback) {
    messageCollection
        .where("recipient", "==", auth().currentUser.uid)
        .get()
        .then(
            querySnapshot => {
                querySnapshot.forEach(data => callback(data.data()))
            }
        )
}

function getRecipientUID(participantsArray) {
    if (participantsArray[0] == auth().currentUser.uid) return participantsArray[1]
    else return participantsArray[0]
}

export async function subscribeToGetMessagedUsers(callBack, onComplete) {
    let processedChats = 0;
    let totalChats = 0;
    messageCollection
        .where("participants", "array-contains", auth().currentUser.uid)
        .onSnapshot(snapshot => {
        totalChats = snapshot.docs.length;
            snapshot.forEach(snapshotData => {
                getUserData(getRecipientUID(snapshotData.data().participants), (data) => {
                    newData = {
                        ...snapshotData.data(),
                        key: snapshotData.id
                    }
                    newData.participantUID = getRecipientUID(newData.participants)
                    newData.participants = data;
                    processedChats++;
                    callBack(newData);
                    if(processedChats === totalChats){
                        onComplete();
                    }
                });

            })
        })
}

export async function updateProfilePicture() {
    userCollection
        .doc(auth().currentUser.uid)
        .update({ profilePhotoLink: auth().currentUser.photoURL })
}

export function generateLastActiveText(timestamp) {
    const isToday = (date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    const isYesterday = (date) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
        );
    };

    const getFullMonth = (month) => {
        switch (month + 1) {
            case 1:
                return "Jan"
                break;
            case 2:
                return "Feb"
                break;
            case 3:
                return "Mar"
                break;
            case 4:
                return "Apr"
                break;
            case 5:
                return "May"
                break;
            case 6:
                return "Jun"
                break;
            case 7:
                return "Jul"
                break;
            case 8:
                return "Aug"
                break;
            case 9:
                return "Sep"
                break;
            case 10:
                return "Oct"
                break;
            case 11:
                return "Nov"
                break;

            default:
                return "Dec"
                break;
        }
    }

    time = new Date(timestamp);
    if (isToday(time)) {
        return "Last active today, " + time.getHours() + ":" + time.getMinutes()
    }
    else if (isYesterday(time)) {
        return "Last active yesterday, " + time.getHours() + ":" + time.getMinutes()
    } else {
        return "Last active " + getFullMonth(time.getMonth()) + " " + time.getDay() + " " + time.getFullYear()
    }
}

export async function subscribeToMessages(chatID, callBack, onComplete, onNoMsgs) {
    const messageRef = messageCollection.doc(chatID).collection("messages");
    messageRef.orderBy("timestamp", 'asc').onSnapshot(async snapshot => {
        if(((await messageRef.get()).docs.length) === 0) onNoMsgs();
        const totalMessages = snapshot.docs.length;
        let processedMessages = 0;
        snapshot.forEach(data => {
            callBack(data.data());
            processedMessages++;
            if (processedMessages === totalMessages) {
                onComplete(); // Call your completion function here
            }
        });
    });
}

export async function sendMessage(chatID, content){
    t = new Date();
    time = firestore.Timestamp.fromDate(t);
    jsonDoc = {
        attachmesntUrl:"", content: content, isRead:false, replyFor:"" , sender:auth().currentUser.uid, timestamp: time
    }
    messageCollection.doc(chatID).collection("messages").add(jsonDoc);
    messageCollection.doc(chatID).update({lastMessage:{
        content: content,
        isMultiMedia: false
    }, lastUpdated: time})
    return jsonDoc
}