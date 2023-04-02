const OrdersModel = require("../models/orders-models.js");
const stripe = require("stripe")(
  "sk_test_51MRoZSEJARdSUOyGomwozuLPWKSEjYMVCnw51w0QgX3TKT5fKAVb5DARJaHsY6wYUs8wY2uQL1KUHlXjayuZAjIY00oCWvur8B"
);

exports.createOrders = async (orders) => {
  let { totalAmount, paymentId } = orders;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "USD",
      description: "Cafe Testing",
      payment_method: paymentId,
      confirm: true,
      // receipt_email:"cheryalabhanu99@gmail.com"
    });
    const payload = {
      ...orders,
      isPaid: payment?.status === "succeeded" ? true : false,
    };
    return await OrdersModel.create(payload);
  } catch (error) {
    console.log("Error", error);
    return {
      message: "Payment failed",
      success: false,
    };
  }
};
