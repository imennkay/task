import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { authApp, firestoreApp } from '../config/firebase';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState('');




  const register = async (email, currency, password) => {
    try {
      firestoreApp.collection('users');
      const res = await authApp.createUserWithEmailAndPassword(currency, email, password);
      const user = res.user;
      await firestoreApp.collection("users").add({
        uid: user.uid,
        currency,
        authProvider: "local",
        email,

      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  const login = (email, password) => {
    return authApp.signInWithEmailAndPassword(email, password);

  };

  const logout = () => {
    return authApp.signOut();
  };

  const bidAuction = (auctionId, price) => {
    if (!currentUser) {
      return setGlobalMsg('Please login first');
    }

    let newPrice = Math.floor((price / 100) * 110);
    const db = firestoreApp.collection('auctions');


    return db.doc(auctionId).update({
      curPrice: newPrice,
      curWinner: currentUser.email,


    });

  };


  const endAuction = (auctionId) => {
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionId).delete();

  };








  useEffect(() => {
    const subscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

    });

    return subscribe;
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => setGlobalMsg(''), 5000);
    return () => clearTimeout(interval);
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        endAuction,
        globalMsg,


      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
