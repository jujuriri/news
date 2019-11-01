import React, { useContext, useState, useEffect } from 'react'
import { FirebaseContext } from '../index'
import { useFirebase } from '../firebase'
import axios from 'axios'

// Get admin settings from firestore first,
// then get news data based on that settings.
// Guests can change settings, but once they leave or refresh
// settings will reset (change back to admin's setting).

function Home() {
  // const firebase = useContext(FirebaseContext)

  useEffect(() => {
    console.log('Home here!')
  }, [])

  return (
    <div>
      <h1>Home(Public)</h1>
      <p>A-Z of news titles</p>
      <p>Latest to Oldest published dates</p>
      <p>Publishers</p>
      <p>Countries</p>
      <p>Categories</p>
    </div>
  )
}

export default Home
