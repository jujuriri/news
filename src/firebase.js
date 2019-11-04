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
      .then(doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data())
          return doc.data()
        }
      })
  }

  // saveSettings() {
  //   return this.db.
  // }
}

const useFirebase = new Firebase()

const useFirebaseAuth = myFirebase => {
  const [authUser, setAuthUser] = useState(null)
  useEffect(() => {
    const unlisten = myFirebase.isLoggedIn(setAuthUser)
    return () => unlisten()
  }, [myFirebase])
  return authUser
}

export { useFirebase, useFirebaseAuth }
