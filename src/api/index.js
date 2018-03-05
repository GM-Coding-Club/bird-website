
import firebase from 'firebase'
import config from '../config/'

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth