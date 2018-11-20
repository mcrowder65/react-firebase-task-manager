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
export const addToTable = (tableName, bodyWithoutTimestamp, authToken) => {
  const body = {
    ...bodyWithoutTimestamp,
    timestamp: new Date()
  };
  return fetcher(`${firebaseUrl}/${tableName}.json?auth=${authToken}`, {
    method: "POST",
    body: JSON.stringify(body)
  });
};

export const setTable = (tableName, bodyWithoutTimestamp, authToken) => {
  const body = {
    ...bodyWithoutTimestamp,
    lastEdited: new Date()
  };
  return fetcher(`${firebaseUrl}/${tableName}.json?auth=${authToken}`, {
    method: "PUT",
    body: JSON.stringify(body)
  });
};
export const getTable = (tableName, auth) => {
  return fetcher(`${firebaseUrl}/${tableName}.json?auth=${auth}`, {
    method: "GET"
  });
};
