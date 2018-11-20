const admin = require("firebase-admin");
const { format, isAfter } = require("date-fns");

// Fetch the service account key JSON file contents
const serviceAccount = require("./private-key.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://task-manager-82de4.firebaseio.com"
});

const main = async () => {
  const db = admin.database();

  const ref = db.ref("reminders");
  const snapshot = await ref.once("value");
  const data = snapshot.val();
  const userIds = Object.keys(data);
  const reminders = await Promise.all(
    userIds.map(async userId => {
      const r = db
        .ref(`reminders/${userId}`)
        .orderByChild("dateToSend")
        .equalTo(format(new Date(), "YYYY-MM-DD"));
      const s = await r.once("value");
      return Object.values(s.val());
    })
  );
  const reducedReminders = reminders.reduce((accum, val) => {
    return [...accum, ...val];
  }, []);
  return reducedReminders.filter(r => {
    return isAfter(
      new Date(),
      format(`${r.dateToSend} ${r.timeToSendReminder}`)
    );
  });
};

main();
