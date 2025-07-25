import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider, // ✅ NEW
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider(); // ✅ NEW

  const [loading, setLoding] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoding(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ GitHub login function
  const signInWithGitHub = () => {
    setLoding(true);
    return signInWithPopup(auth, githubProvider);
  };

  const signOutUser = async () => {
    setLoding(true);
    await signOut(auth);
    localStorage.removeItem("accessToken");
    setLoding(false);
    setUser(null);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoding(false);
      currentUser
        ? console.log('User in authstate change ', currentUser)
        : console.log('There is no current User');
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    loading,
    user,
    createUser,
    signInUser,
    signInWithGoogle,
    signInWithGitHub, // ✅ Export this
    signOutUser
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
