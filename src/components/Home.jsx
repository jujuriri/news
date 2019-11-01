import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [news, setNews] = useState({ list: [] })

  return (
    <div>
      <h1>Home(Public)</h1>
    </div>
  )
}

export default Home
