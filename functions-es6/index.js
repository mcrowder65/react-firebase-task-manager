const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const { format, isAfter } = require("date-fns");
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
    return accum.concat(val);
  }, []);
  return reducedReminders.filter(r => {
    return isAfter(
      new Date(),
      format(`${r.dateToSend} ${r.timeToSendReminder}`)
    );
  });
};
exports.helloWorld = functions.https.onRequest(async (req, reply) => {
  if (req.body.token === "my-password" || req.params.token === "my-password") {
    const remindersToSend = await getRemindersToSend();
    await Promise.all(
      remindersToSend.map(async reminder => {
        await sendReminder({
          senderEmail: "matt.taskmanager@gmail.com",
          senderPassword: "mattcrowder123",
          subject: reminder.subject,
          emailBody: reminder.body,
          receiverEmail: reminder.receivingEmailAccount
        });
      })
    );
    reply.send(remindersToSend);
  } else {
    reply.send(
      `you are not allowed access ${JSON.stringify(req.body)} req.body.token: ${
        req.body.token
      }`
    );
  }
});
