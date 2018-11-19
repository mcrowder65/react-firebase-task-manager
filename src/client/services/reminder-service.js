import { addToTable, getTable } from "./firebase-service";
import { getUser } from "../models/user-model";
import { getFormattedDate } from "../utils";

export const addReminder = async previousMetadata => {
  const currentUser = await getUser();
  const metadata = {
    ...previousMetadata,
    dateToSend: getFormattedDate(previousMetadata.dateToSend)
  };
  return addToTable(`reminders/${currentUser.uid}`, metadata);
};

export const getCurrentUsersReminders = async () => {
  const currentUser = await getUser();
  return getTable(`reminders/${currentUser.uid}`);
};
