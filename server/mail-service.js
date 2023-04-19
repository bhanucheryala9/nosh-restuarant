const express = require("express");
const nodemailer = require("nodemailer");
exports.sendEmail = async (payload) => {
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
