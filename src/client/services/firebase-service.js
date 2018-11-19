import firebase from "@firebase/app";
import "@firebase/auth";

import { fetcher } from "../fetcher";

export const getUserFromFirebase = () => {
  return firebase.auth().currentUser;
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

export const addToTable = (tableName, body) => {
  return fetcher(
    `https://task-manager-82de4.firebaseio.com/${tableName}.json`,
    {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(body)
    }
  );
};
