import {
  getTable,
  getUserFromFirebase,
  setTable,
} from "../services/firebase-service";

export const getUser = getUserFromFirebase;

export const setUser = async (metadata) => {
  const currentUser = await getUser();

  return setTable(`users/${currentUser.uid}`, metadata, currentUser.qa);
};

export const getUserMetadata = async () => {
  const currentUser = await getUser();

  return getTable(`users/${currentUser.uid}`, currentUser.qa);
};
