import firebase from "@firebase/app";
import "@firebase/auth";

export const getUser = () => {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(user => resolve(user));
  });
};

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signup = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};
