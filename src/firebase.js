import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: 'news-4ef12.firebaseapp.com',
  databaseURL: 'https://news-4ef12.firebaseio.com',
  projectId: 'news-4ef12',
  storageBucket: 'news-4ef12.appspot.com',
  messagingSenderId: '890937201506',
  appId: `${process.env.REACT_APP_FIREBASE_APPID}`,
  measurementId: 'G-2QYDG5TDTW',
}

class Firebase {
  constructor() {
    firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.db = firebase.firestore()
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  logOut() {
    return this.auth.signOut()
  }

  isLoggedIn(callback) {
    return this.auth.onAuthStateChanged(authUser => {
      authUser ? callback(authUser) : callback(null)
    })
  }

  getSettings() {
    return this.db
      .collection('settings')
      .doc('options')
      .get()
  }

  saveSettings(settings) {
    return this.db
      .collection('settings')
      .doc('options')
      .set(settings)
  }
}

const useFirebase = new Firebase()

export default useFirebase
