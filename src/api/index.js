import firebase from 'firebase';
import {firebaseConfig} from '../config/';

firebase.initializeApp(firebaseConfig)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth