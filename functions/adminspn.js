// send push notification

const FCM = require("fcm-node");
const fcm = new FCM(process.env.ServerKey);
const User = require("../models/user-model");
const Adminnotification = require("../models/notification-model");

module.exports = async (title, body, id) => {
    let user = await User.findOne({where:{ _id: id}});
    if (user && user.fcm && user.fcm.length > 0 && user.status != "-1")
      user.fcm.forEach((e) => {
        fcm.send({ to: e, notification: { title: title, body: body } }, function (err, response) {
          console.log(err);
        });
      });
  
};

// send push notification
