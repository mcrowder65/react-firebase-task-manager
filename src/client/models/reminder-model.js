import { addToTable, getTable } from "../services/firebase-service";
import { getUser } from "./user-model";
import { getFormattedDate } from "../utils";
import firebase from "@firebase/app";
import "@firebase/database";

export const addReminder = async previousMetadata => {
  const currentUser = await getUser();
  const metadata = {
    ...previousMetadata,
    dateToSend: getFormattedDate(previousMetadata.dateToSend)
  };
  return addToTable(`reminders/${currentUser.uid}`, metadata, currentUser.qa);
};

export const getUserRemindersByDay = async date => {
  const currentUser = await getUser();

  const snapshot = await firebase
    .database()
    .ref(`/reminders/${currentUser.uid}`)
    .once("value");
  // return getTable(`reminders/${currentUser.uid}`, currentUser.qa);
  return snapshot.val();
};
