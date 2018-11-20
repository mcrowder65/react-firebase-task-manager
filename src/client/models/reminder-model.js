import firebase from "@firebase/app";
import "@firebase/database";

import { addToTable } from "../services/firebase-service";
import { getUser } from "./user-model";
import { getFormattedDate } from "../utils";

export const addReminder = async previousMetadata => {
  const currentUser = await getUser();
  const metadata = {
    ...previousMetadata,
    uid: currentUser.uid,
    dateToSend: getFormattedDate(previousMetadata.dateToSend)
  };
  return addToTable(`reminders/${currentUser.uid}`, metadata, currentUser.qa);
};

export const getUserRemindersByDay = async date => {
  const currentUser = await getUser();

  const snapshot = await firebase
    .database()
    .ref(`/reminders`)
    .orderByChild("userId")
    .equalTo(currentUser.uid)
    .once("value");
  return snapshot.val();
};
