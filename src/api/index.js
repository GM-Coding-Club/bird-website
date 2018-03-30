import firebase from 'firebase';
import {firebaseConfig, clarifAiPublic} from '../config/';

const Clarifai = require('clarifai');

firebase.initializeApp(firebaseConfig)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
export const clarifAiApp = new Clarifai.App({apiKey: clarifAiPublic});