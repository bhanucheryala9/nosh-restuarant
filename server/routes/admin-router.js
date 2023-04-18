var express = require("express");
var router = express.Router();
var fs = require("fs");
const usersService = require("../services/users-services.js");
const inventoryService = require("../services/inventory-services.js");
const rewardsService = require("../services/rewards-services.js");
const orderService = require("../services/orders-services.js");

router.post("/add-employee", function (req, res, next) {
  const payload = req.body;
  fs.readFile("./data/admin/employee.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to employee data...!" });
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
          res.status(500).json({ message: "Failed to employee data...!" });
          return;
        }
        res
          .status(200)
          .json({ message: "Successfully uploaded employee data...!" });
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
      res.status(500).json({ message: "Failed to employee data...!" });
      return;
    }
    res.status(200).json({ employees: JSON.parse(data) });
  });
});
router.get("/v1/get-employee-details", async function (req, res, next) {
  try {
    const users = await usersService.getsUsers();
    res.json({ employees: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/v1/get-user-details", async function (req, res, next) {
  const id = req.query.id;
  try {
    const userDetails = await usersService.getUsersByID(id);
    res.json({ userInfo: userDetails, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/v1/delete-employee", async function (req, res, next) {
  const id = req.query.id;
  try {
    const userDetails = await usersService.deleteUserByID(id);
    res.json({ employees: userDetails, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/v1/update-employee", async function (req, res, next) {
  const payload = req.body;
  try {
    const users = await usersService.updateUserByID(payload);
    res.json({ users: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/v1/getuserdetailsbyId", async function (req, res, next) {
  const payload = req.query.id;
  try {
    const users = await usersService.getUsersByID(payload);
    res.json({ users: users, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/***
 *
 * Admin Module: Inventory routes
 *
 */
router.post("/add-item", function (req, res, next) {
  const payload = req.body;
  fs.readFile("./data/admin/items.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add item data...!" });
      return;
    }
    const previousData = JSON.parse(data);
    const newItemData = [...previousData, payload];
    const updatedJsonData = JSON.stringify(newItemData);
    fs.writeFile("./data/admin/items.json", updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add item...!" });
        return;
      }
      res.status(200).json({ message: "Successfully uploaded item...!" });
    });
  });
});

router.get("/get-items", function (req, res, next) {
  fs.readFile("./data/admin/items.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch items data...!" });
      return;
    }
    res.status(200).json({ inventory: JSON.parse(data) });
  });
});
/**
 *
 *  Inventory V1
 */
router.post("/v1/add-item", async function (req, res, next) {
  const payload = req.body;
  try {
    const items = await inventoryService.createInventory(payload);
    res.json({ items: items, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/v1/get-items", async function (req, res, next) {
  try {
    const items = await inventoryService.getInventoryItems();
    res.json({ items: items, code: 200, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/v1/delete-item", async function (req, res, next) {
  const id = req.query.id;
  try {
    const items = await inventoryService.deleteInventoryItemByID(id);
    res.json({ items: items, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/v1/update-item", async function (req, res, next) {
  const payload = req.body;
  try {
    const item = await inventoryService.updateInventoryItemID(payload);
    res.json({ items: item, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/**
 *
 * Rewards Section
 *
 */

router.post("/add-reward", function (req, res, next) {
  const payload = req.body;
  fs.readFile("./data/admin/promos.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add reward...!" });
      return;
    }
    const previousData = JSON.parse(data);
    const newItemData = [...previousData, payload];
    const updatedJsonData = JSON.stringify(newItemData);
    fs.writeFile("./data/admin/promos.json", updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add reward...!" });
        return;
      }
      res
        .status(200)
        .json({ message: "Successfully uploaded reward information...!" });
    });
  });
});

router.get("/get-rewards", function (req, res, next) {
  fs.readFile("./data/admin/promos.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Failed to fetch rwards information...!" });
      return;
    }
    res.status(200).json({ rewards: JSON.parse(data) });
  });
});

/**
 *
 *  Rewards V1 Sections
 *
 */
router.post("/v1/add-reward", async function (req, res, next) {
  const payload = req.body;
  try {
    const rewards = await rewardsService.createRewards(payload);
    res.json({ rewards: rewards, code: 200, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/v1/get-rewards", async function (req, res, next) {
  try {
    const rewards = await rewardsService.getRewardsItems();
    res.json({ rewards: rewards, code: 200, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/v1/delete-reward", async function (req, res, next) {
  const id = req.query.id;
  try {
    const rewards = await rewardsService.deleteRewardsItemByID(id);
    res.json({ rewards: rewards, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/v1/update-reward", async function (req, res, next) {
  const payload = req.body;
  try {
    const rewards = await rewardsService.updateRewardsItemID(payload);
    res.json({ rewards: rewards, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * 
 *   Order details
 * 
 */

router.get("/v1/get-orders", async function (req, res, next) {
  try {
    const items = await orderService.getOrdersItems();
    res.json({ items: items, code: 200, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/v1/update-order-status", async function (req, res, next) {
  try {
    const payload = req.body;
    const items = await orderService.updateOrderStatus(payload);
    res.json({ items: items, code: 200, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/v1/get-employee-items", async function (req, res, next) {
  try {
    const items = await inventoryService.getInventoryItems();
    res.json({ items: items, code: 200, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/v1/update-items-status", async function (req, res, next) {
  try {
    const payload = req.body;
    const items = await inventoryService.updateInventoryItemID(payload);
    res.json({ items: items, code: 200, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
