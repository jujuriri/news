import { useState, useEffect } from 'react'

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

const useAsync = (effect, inputs) => {
  useEffect(() => {
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs)
}

export { useFirebaseAuth, useAsync }
