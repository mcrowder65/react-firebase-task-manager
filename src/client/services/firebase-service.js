import firebase from "@firebase/app";
import "@firebase/auth";

import { fetcher } from "../fetcher";

export const getUserFromFirebase = () => {
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

export const logout = () => {
  return firebase.auth().signOut();
};

const firebaseUrl = `https://task-manager-82de4.firebaseio.com`;
export const addToTable = (tableName, bodyWithoutTimestamp) => {
  const body = {
    ...bodyWithoutTimestamp,
    timestamp: new Date()
  };
  return fetcher(`${firebaseUrl}/${tableName}.json`, {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify(body)
  });
};

export const getTable = tableName => {
  return fetcher(`${firebaseUrl}/${tableName}.json`, {
    method: "GET",
    "Content-Type": "application/json"
  });
};
