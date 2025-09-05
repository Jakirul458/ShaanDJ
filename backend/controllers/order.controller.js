const Order = require("../models/Order");
const Album = require("../models/Album");
const paypal = require("@paypal/checkout-server-sdk");

// PayPal Environment
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (process.env.NODE_ENV === "production") {
    return new paypal.core.LiveEnvironment(clientId, clientSecret);
  } else {
    return new paypal.core.SandboxEnvironment(clientId, clientSecret);
  }
}

// PayPal Client
function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

// Create PayPal Order
const createOrder = async (req, res) => {
  try {
    const { albumId } = req.body;
    const userId = req.user._id;

    // Get album details
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found"
      });
    }

    // Check if user already purchased this album
    const existingOrder = await Order.findOne({
      user: userId,
      album: albumId,
      paid: true
    });

    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: "You have already purchased this album"
      });
    }

    // Create PayPal order
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: album.price.toFixed(2)
        },
        description: `Album: ${album.title}`
      }],
      application_context: {
        brand_name: "Music Store",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        return_url: `${process.env.BASE_URL || "http://localhost:3000"}/purchases`,
        cancel_url: `${process.env.BASE_URL || "http://localhost:3000"}/albums`
      }
    });

    const paypalResponse = await client().execute(request);

    // Save order to database
    const order = await Order.create({
      user: userId,
      album: albumId,
      paypalOrderId: paypalResponse.result.id,
      amount: album.price,
      paid: false
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {
        paypalOrderId: paypalResponse.result.id,
        dbOrderId: order._id,
        approvalUrl: paypalResponse.result.links.find(link => link.rel === "approve").href
      }
    });

  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message
    });
  }
};

// Capture PayPal Order
const captureOrder = async (req, res) => {
  try {
    const { paypalOrderId } = req.body;
    const userId = req.user._id;

    // Find the order in database
    const order = await Order.findOne({
      paypalOrderId,
      user: userId,
      paid: false
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or already processed"
      });
    }

    // Capture PayPal payment
    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const captureResponse = await client().execute(request);

    if (captureResponse.result.status === "COMPLETED") {
      // Update order as paid
      order.paid = true;
      await order.save();

      return res.status(200).json({
        success: true,
        message: "Payment captured successfully",
        data: {
          orderId: order._id,
          paypalOrderId: paypalOrderId,
          status: "COMPLETED"
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment capture failed",
        data: captureResponse.result
      });
    }

  } catch (error) {
    console.error("Error capturing order:", error);
    return res.status(500).json({
      success: false,
      message: "Error capturing order",
      error: error.message
    });
  }
};

// Get User's Orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({
      user: userId,
      paid: true
    })
    .populate("album", "title description duration price image")
    .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      count: orders.length,
      data: orders
    });

  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

// Download Album (TODO: Implement Google Drive integration)
const downloadAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;
    const userId = req.user._id;

    // Check if user purchased this album
    const order = await Order.findOne({
      user: userId,
      album: albumId,
      paid: true
    }).populate("album");

    if (!order) {
      return res.status(403).json({
        success: false,
        message: "You have not purchased this album"
      });
    }

    // TODO: Implement Google Drive download using driveFileId
    // For now, return the drive file ID
    return res.status(200).json({
      success: true,
      message: "Download authorized",
      data: {
        albumTitle: order.album.title,
        driveFileId: order.album.driveFileId,
        downloadUrl: `https://drive.google.com/file/d/${order.album.driveFileId}/view`
      }
    });

  } catch (error) {
    console.error("Error processing download:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing download",
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  captureOrder,
  getMyOrders,
  downloadAlbum
};