const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const accountCreateHtml = fs.readFileSync(
  "./accountCreation.handlebars",
  "utf-8"
);
const accountCreateTemplate = handlebars.compile(accountCreateHtml);
const paymentHtml = fs.readFileSync("./payment.handlebars", "utf-8");
const paymentTemplate = handlebars.compile(paymentHtml);
function GetTemplates(purpose, data) {
  console.log("************ purpose:", purpose)
  if (purpose === "add-user") {
    return paymentTemplate({
      name: data?.name,
      orderItems: data?.orders,
      total: `${data?.totalAmount}`,
    });
  } else {
    return accountCreateTemplate();
  }
}

exports.sendEmail = async (payload, purpose, data) => {
  const { name, email, message, subject } = payload;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noshapplication1228@gmail.com",
      pass: "xhwcrapzqoanbadu",
    },
  });

  let mailDetails = {
    from: "noshapplication1228@gmail.com",
    to: email,
    subject: subject,
    text: message,
    html: GetTemplates(purpose, data),
  };

  mailTransporter.sendMail(mailDetails, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully");
    }
  });
  return "Email sent..!";
};
