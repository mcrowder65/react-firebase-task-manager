import { addToTable, getTable } from "../services/firebase-service";
import { getUser } from "./user-model";
import { getFormattedDate } from "../utils";

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
  return getTable(`reminders/${currentUser.uid}`, currentUser.qa);
};
