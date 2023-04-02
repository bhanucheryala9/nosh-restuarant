var express = require("express");
var router = express.Router();
var fs = require("fs");
const orderService = require("../services/orders-services.js");
const MailService = require("../mail-service");

router.post("/v1/place-order", async function (req, res, next) {
  const payload = req.body;
  console.log("Received at router file:", payload);
  const orders = req.body?.orderDetails;
  const orderspayload = orders?.map((item) => {
    return {
      name: item.productName,
      price: `$${item.price}`,
    };
  });

  try {
    const orders = await orderService.createOrders(payload);
    if (orders) {
      const mailBody = {
        email: payload.email,
      };
      MailService.sendEmail(mailBody, "order", {
        orders: orderspayload,
        name: req.body?.firstName + " " + req.body?.lastName,
        totalAmount: `$${(req.body?.totalAmount / 100).toFixed(2)}`,
      });
    }
    res.json({ orders: orders, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
