import { firebase as fb } from 'config'
import * as firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: fb.apiKey,
  authDomain: `${fb.projectId}.firebaseapp.com`,
  databaseURL: `https://${fb.projectId}.firebaseio.com`,
  projectId: fb.projectId,
  storageBucket: `${fb.projectId}.appspot.com`,
  messagingSenderId: fb.senderId
})

let db = firebase.firestore()

export const markersRef = db.collection('markers')
