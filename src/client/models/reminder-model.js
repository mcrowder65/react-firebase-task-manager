import { addToTable, getTable } from "../services/firebase-service";
import { getUser } from "./user-model";
import { getFormattedDate } from "../utils";

export const addReminder = async previousMetadata => {
  const currentUser = await getUser();
  const metadata = {
    ...previousMetadata,
    dateToSend: getFormattedDate(previousMetadata.dateToSend)
  };
  return addToTable(
    `reminders/${currentUser.uid}/${metadata.dateToSend}`,
    metadata,
    currentUser.qa
  );
};

export const getUserRemindersByDay = async unformattedDate => {
  const date = getFormattedDate(unformattedDate);
  const currentUser = await getUser();
  return getTable(`reminders/${currentUser.uid}/${date}`, currentUser.qa);
};
