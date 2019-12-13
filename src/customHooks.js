import { useState, useEffect, useRef } from 'react'

// The Powerful Helpers: Custom Hooks! :DDDD

// Detect if administor is logged in.
const useFirebaseAuth = myFirebase => {
  const [authUser, setAuthUser] = useState(null)
  useEffect(() => {
    const unlisten = myFirebase.isLoggedIn(setAuthUser)
    return () => unlisten()
  }, [myFirebase])
  return authUser
}

// Memo down previous props or state, allow me to compare with current value.
const usePrevious = value => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// Detect window width.
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  return width
}

export { useFirebaseAuth, usePrevious, useWindowWidth }
