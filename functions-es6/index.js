const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

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

exports.helloWorld = functions.https.onRequest(async () => {
  await sendReminder({
    senderEmail: "matt.taskmanager@gmail.com",
    senderPassword: "mattcrowder123",
    subject: "Google cloud!",
    emailBody: "Sent from a cloud function",
    receiverEmail: "mcrowder65@gmail.com"
  });
});
