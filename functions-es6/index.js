const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const { format, isAfter, getTime } = require("date-fns");
const admin = require("firebase-admin");
require("babel-polyfill");

const sendReminder = reminder => {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: reminder.senderEmail,
          pass: reminder.senderPassword
        }
      });

      const mailOptions = {
        from: reminder.senderEmail,
        to: reminder.receiverEmail,
        subject: reminder.subject,
        html: reminder.emailBody
      };

      await sendMail(transporter, mailOptions);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

  function sendMail(transporter, mailOptions) {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};

// Fetch the service account key JSON file contents
const serviceAccount = require("./private-key.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://task-manager-82de4.firebaseio.com"
});

const getRemindersToSend = async () => {
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

const deleteReminder = async (id, uid) => {
  const db = admin.database();
  await db.ref(`reminders/${uid}/${id}`).remove();
};
exports.helloWorld = functions.https.onRequest(async (req, reply) => {
  if (
    req.body.token === "my-password" ||
    req.params.token === "my-password" ||
    req.query.token === "my-password"
  ) {
    const remindersToSend = await getRemindersToSend();
    await Promise.all(
      Object.values(remindersToSend).map(async reminder => {
        await sendReminder({
          senderEmail: reminder.sendingEmailAccount,
          senderPassword: reminder.sendingEmailPassword,
          subject: reminder.subject,
          emailBody: reminder.body,
          receiverEmail: reminder.receivingEmailAccount
        });
      })
    );
    await Promise.all(
      Object.entries(remindersToSend).map(async ([id, { uid }]) => {
        await deleteReminder(id, uid);
      })
    );
    reply.send("success!");
  } else {
    reply.send(
      `you are not allowed access ${JSON.stringify(req.body)} req.body.token: ${
        req.body.token
      } ${JSON.stringify(req.params)} ${JSON.stringify(req.query)}`
    );
  }
});
