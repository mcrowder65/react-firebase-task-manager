"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functions = require("firebase-functions");
var nodemailer = require("nodemailer");

var sendReminder = function sendReminder(reminder) {
  return new Promise(function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve, reject) {
      var transporter, mailOptions;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                  user: reminder.senderEmail,
                  pass: reminder.senderPassword
                }
              });
              mailOptions = {
                from: reminder.senderEmail,
                to: reminder.receiverEmail,
                subject: reminder.subject,
                html: reminder.emailBody
              };
              _context.next = 5;
              return sendMail(transporter, mailOptions);

            case 5:
              resolve();
              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);

              reject(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  function sendMail(transporter, mailOptions) {
    return new Promise(function (resolve, reject) {
      transporter.sendMail(mailOptions, function (error) {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};

exports.helloWorld = functions.https.onRequest((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
  return _regenerator2.default.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return sendReminder({
            senderEmail: "matt.taskmanager@gmail.com",
            senderPassword: "mattcrowder123",
            subject: "Google cloud!",
            emailBody: "Sent from a cloud function",
            receiverEmail: "mcrowder65@gmail.com"
          });

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, undefined);
})));
