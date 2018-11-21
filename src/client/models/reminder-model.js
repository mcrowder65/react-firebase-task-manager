import firebase from "@firebase/app";
import "@firebase/database";
import { format, getTime } from "date-fns";

import { addToTable, deleteRecord } from "../services/firebase-service";
import { getUser } from "./user-model";
import { getFormattedDate } from "../utils";
import { fetcher } from "../fetcher";

export const addReminder = async previousMetadata => {
  const currentUser = await getUser();
  const metadata = {
    ...previousMetadata,
    uid: currentUser.uid,
    dateToSend: getFormattedDate(previousMetadata.dateToSend),
    millisecondsToSend: getTime(
      format(
        `${getFormattedDate(previousMetadata.dateToSend)} ${
          previousMetadata.timeToSendReminder
        }`
      )
    )
  };
  return addToTable(`reminders/${currentUser.uid}`, metadata, currentUser.qa);
};

export const getUserRemindersByDay = async () => {
  const currentUser = await getUser();

  const snapshot = await firebase
    .database()
    .ref(`/reminders`)
    .orderByChild("userId")
    .equalTo(currentUser.uid)
    .once("value");
  return snapshot.val();
};

export const deleteReminder = async reminderId => {
  const currentUser = await getUser();
  return deleteRecord(
    `reminders/${currentUser.uid}/${reminderId}`,
    currentUser.qa
  );
};

export const sendReminderImmediately = async reminderId => {
  const currentUser = await getUser();
  return fetcher(`${process.env.API_URL}?auth=${currentUser.qa}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reminderId })
  });
};
