import firebase from "@firebase/app";
import "@firebase/auth";

import { fetcher } from "../fetcher";
import { getUser } from "../models/user-model";

export const getUserFromFirebase = () => {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => resolve(user));
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

async function withAuth(yourFunction) {
  const currentUser = await getUser();
  return () => yourFunction(currentUser.qa);
}
export const addToTable = withAuth((authToken) => (tableName, body) => {
  return fetcher(`${firebaseUrl}/${tableName}.json?auth=${authToken}`, {
    method: "POST",
    body: JSON.stringify({
      ...body,
      timestamp: new Date(),
    }),
  });
});

export const deleteRecord = (recordPath, authToken) => {
  return fetcher(`${firebaseUrl}/${recordPath}.json?auth=${authToken}`, {
    method: "DELETE",
  });
};
export const setTable = (tableName, bodyWithoutTimestamp, authToken) => {
  const body = {
    ...bodyWithoutTimestamp,
    lastEdited: new Date(),
  };
  return fetcher(`${firebaseUrl}/${tableName}.json?auth=${authToken}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};
export const getTable = (tableName, auth) => {
  return fetcher(`${firebaseUrl}/${tableName}.json?auth=${auth}`, {
    method: "GET",
  });
};
