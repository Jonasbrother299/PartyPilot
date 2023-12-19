import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '../config/supabaseConfig'

import UserStack from './userStack';
import AuthStack from './authStack';

export default function RootNavigation() {
  
   const [session, setSession] = useState(null)

  useEffect(() => {
      // Checks if there is already a session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
    {/* Subscribe to auth state changes using onAuthStateChange
        This subscription allows the component to react dynamically to login/logout events,
        updating the local 'session' state with the latest authentication information.*/}
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
    
    // Clean up the subscription when the component unmounts
    return () => supabase.auth.removeAuthStateListener()
    }, [])

    // Conditional rendering based on the existence of a user session
    return session && session.user ? <UserStack key={session.user.id} session={session} /> : <AuthStack />;     
}