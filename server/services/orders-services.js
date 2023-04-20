const OrdersModel = require("../models/orders-models.js");
const stripe = require("stripe")(
  "sk_test_51MRoZSEJARdSUOyGomwozuLPWKSEjYMVCnw51w0QgX3TKT5fKAVb5DARJaHsY6wYUs8wY2uQL1KUHlXjayuZAjIY00oCWvur8B"
);

exports.createOrders = async (orders) => {
  let { totalAmount, paymentId } = orders;
  try {
    const payment = await stripe.paymentIntents
      .create({
        amount: totalAmount,
        currency: "USD",
        description: "Cafe Testing",
        payment_method: paymentId,
        confirm: true,
        // receipt_email:"cheryalabhanu99@gmail.com"
      })
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

exports.getUserSpecificOrder = async (email) =>{
    return await OrdersModel.find({email:email }).sort ( { createdAt: -1 } )
}

exports.getOrdersItems = async () => {
  return await OrdersModel.find({});
};

exports.getOrdersItemByID = async (id) => {
  return await OrdersModel.findOne({ orderId: id });
};

exports.deleteOrdersItemByID = async (id) => {
  return await OrdersModel.findOneAndDelete({ id: id })
    .then(() => {
      return OrdersModel.find({});
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateOrdersItemID = async (payload) => {
  return await OrdersModel.findOneAndUpdate(
    { id: payload.id },
    {
      $set: {
        productName: payload.productName,
        description: payload.description,
        price: payload.price,
        discount: payload.discount,
        isAvailable: payload.isAvailable,
        tax: payload.tax,
        category: payload.category,
      },
    }
  )
    .then(() => {
      return OrdersModel.find({});
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
};

exports.updateOrderStatus = async (payload) =>{
  return await OrdersModel.findOneAndUpdate(
    { orderId: payload.orderId },
    {
      $set: {
        orderId: payload.orderId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        address: payload.address,
        orderDetails: payload.orderDetails,
        totalAmount: payload.totalAmount,
        orderStatus: payload.orderStatus,
        isPaid: payload.isPaid,
        paymentId: payload.paymentId,
      },
    }
  )
    .then(() => {
      return OrdersModel.find({});
    })
    .catch(() => {
      return "Failed to retreive updated employee data";
    });
}
