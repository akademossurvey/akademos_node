const router = require("express").Router();

// main routes 
router.use("/admin", require("./admin-route"));
router.use("/user", require("./user-route"));
router.use("/setting", require("./setting-route"));
router.use("/notification", require("./notification-route"));
router.use("/survey", require("./survey-route"));
router.use("/reward", require("./rewards-route"));
router.use("/userresponse", require("./user-response-route"));

module.exports = router;
