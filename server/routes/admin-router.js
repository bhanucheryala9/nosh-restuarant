var express = require("express");
var router = express.Router();
var fs = require("fs");
const usersService = require("../services/users-services.js");

router.post("/add-employee", function (req, res, next) {
  const payload = req.body;
  fs.readFile("./data/admin/employee.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({message:"Failed to employee data...!"});
      return;
    }
    const previousData = JSON.parse(data);
    const newEmployeeData = [...previousData, payload];
    const updatedJsonData = JSON.stringify(newEmployeeData);
    fs.writeFile(
      "./data/admin/employee.json",
      updatedJsonData,
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({message:"Failed to employee data...!"});
          return;
        }
        res.status(200).json({message:"Successfully uploaded employee data...!"});
      }
    );
  });
});

router.post("/v1/add-employee", async function (req, res, next) {
  const payload = req.body;
  try {
    const users = await usersService.createUsers(payload);
    res.json({ users: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/employee-details", function (req, res, next) {
  fs.readFile("./data/admin/employee.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({message:"Failed to employee data...!"});
      return;
    }
    res.status(200).json({employees: JSON.parse(data)});
  });
});


router.post("/add-item", function (req, res, next) {
  const payload = req.body;
  fs.readFile("./data/admin/items.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({message:"Failed to add item data...!"});
      return;
    }
    const previousData = JSON.parse(data);
    const newItemData = [...previousData, payload];
    const updatedJsonData = JSON.stringify(newItemData);
    fs.writeFile(
      "./data/admin/items.json",
      updatedJsonData,
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({message:"Failed to add item...!"});
          return;
        }
        res.status(200).json({message:"Successfully uploaded item...!"});
      }
    );
  });
});

router.get("/get-items", function (req, res, next) {
  fs.readFile("./data/admin/items.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({message:"Failed to fetch items data...!"});
      return;
    }
    res.status(200).json({inventory: JSON.parse(data)});
  });
});


router.post("/add-reward", function (req, res, next) {
  const payload = req.body;
  fs.readFile("./data/admin/promos.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({message:"Failed to add reward...!"});
      return;
    }
    const previousData = JSON.parse(data);
    const newItemData = [...previousData, payload];
    const updatedJsonData = JSON.stringify(newItemData);
    fs.writeFile(
      "./data/admin/promos.json",
      updatedJsonData,
      "utf8",
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({message:"Failed to add reward...!"});
          return;
        }
        res.status(200).json({message:"Successfully uploaded reward information...!"});
      }
    );
  });
});

router.get("/get-rewards", function (req, res, next) {
  fs.readFile("./data/admin/promos.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({message:"Failed to fetch rwards information...!"});
      return;
    }
    res.status(200).json({rewards: JSON.parse(data)});
  });
});

module.exports = router;
