import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export function login() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function logout() {
  return signOut(auth);
}

// Updated function to handle null user
export function loggedInUserDisplayName() {
  return auth.currentUser ? auth.currentUser.displayName : "Guest";
}

// Hook to track authentication state
export function useAuthentication() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
    });
    return unsubscribe;
  }, []);

  return user;
}
