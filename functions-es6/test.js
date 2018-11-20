const admin = require("firebase-admin");
const { format, getTime } = require("date-fns");

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

  const data = snapshot.val() || {};
  const userIds = Object.keys(data);
  const result = await Promise.all(
    userIds.map(async userId => {
      const r = db
        .ref(`reminders/${userId}`)
        .orderByChild("millisecondsToSend")
        .endAt(getTime(format(new Date())));
      const s = await r.once("value");
      return s.val();
    })
  );
  const v = result.reduce((accum, obj) => {
    return {
      ...accum,
      ...obj
    };
  }, {});
  return v;
};

main();
