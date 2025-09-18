const express = require("express");
const router = express.Router();
const moiveController = require("../controllers/moiveController.js");

// Insert a new moive
router.post("/insertMoive", moiveController.insertMoive);

// Add a review to a moive
router.post("/:moiveId/review", moiveController.addReview);
// Get a moive with its reviews
router.get("/:moiveId/reviews", moiveController.getMoivesWithReviews);

module.exports = router;