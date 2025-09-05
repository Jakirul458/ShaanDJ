const express = require("express");
const {
  createOrder,
  captureOrder,
  getMyOrders,
  downloadAlbum
} = require("../controllers/order.controller");
const userAuth = require("../middleware/userAuth"); // User auth

const router = express.Router();

// All routes require user authentication
router.post("/create", userAuth, createOrder);        // POST /api/orders/create
router.post("/capture", userAuth, captureOrder);      // POST /api/orders/capture
router.get("/mine", userAuth, getMyOrders);           // GET /api/orders/mine

module.exports = router;