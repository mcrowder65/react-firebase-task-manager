import { addToTable } from "./firebase-service";
import { getUser } from "../models/user-model";

export const addReminder = async metadata => {
  const currentUser = await getUser();
  return addToTable("reminders", { ...metadata, userId: currentUser.uid });
};
