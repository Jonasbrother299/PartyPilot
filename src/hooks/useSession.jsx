import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseConfig';

// Create a context with default values
const SessionContext = createContext({ session: null, loading: true });

export const useSession = () => {
  // Use the useContext hook to access the context
  return useContext(SessionContext);
};

// Create a provider component to wrap your app and manage the session state
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Checks if there is already a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Subscribe to auth state changes using onAuthStateChange
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    // Clean up the subscription when the component unmounts
    return () => supabase.auth.removeAuthStateListener();
  }, []);

  return (
    // Provide the session and loading state to the context
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
};