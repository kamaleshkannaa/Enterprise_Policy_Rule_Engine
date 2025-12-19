// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import {
//   User,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// interface AuthContextType {
//   currentUser: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (email: string, password: string, displayName: string) => Promise<void>;
//   loginWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const signup = async (email: string, password: string, displayName: string) => {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     await updateProfile(userCredential.user, { displayName });
//   };

//   const login = async (email: string, password: string) => {
//     await signInWithEmailAndPassword(auth, email, password);
//   };

//   // ✅ GOOGLE LOGIN (THIS WAS MISSING)
//   const loginWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     await signInWithPopup(auth, provider);
//   };

//   const logout = async () => {
//     await signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         login,
//         signup,
//         loginWithGoogle, // ✅ EXPOSED HERE
//         logout,
//         loading,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
    }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email: string, password: string, displayName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        loginWithGoogle,
        logout,
        loading,
      }}
    >
      {children} {/* ✅ FIX: DO NOT BLOCK RENDERING */}
    </AuthContext.Provider>
  );
};
