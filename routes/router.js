const router = require("express").Router();
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");
//const dbModel = include('staticData');

router.get("/", async (req, res) => {
  console.log("page hit");

  try {
    const result = await dbModel.getAllPurchase();
    res.render("index", { purchase: result });

    //Output the results of the query to the Heroku Logs
    console.log(result);
  } catch (err) {
    res.render("error", { message: "Error reading from MySQL" });
    console.log("Error reading from mysql");
  }
});

router.get("/addItem", async (req, res) => {
  console.log("form submit");
  console.log(req.query);
  const id = req.query.id;
  const quantity = parseInt(req.query.quantity) + 1;
  try {
    const success = await dbModel.updateItem(id, quantity);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

router.get("/subItem", async (req, res) => {
  console.log("form submit");
  console.log(req.query);
  const id = req.query.id;
  const quantity = parseInt(req.query.quantity) - 1;
  try {
    const success = await dbModel.updateItem(id, quantity);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

router.get("/deleteItem", async (req, res) => {
  console.log("delete user");
  console.log(req.query);
  let id = req.query.id;
  if (id) {
    const success = await dbModel.deleteItem(id);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to mysql");
      console.log(err);
    }
  }
});

router.post("/addPurchase", async (req, res) => {
  try {
    const id = req.query.id;
    const { name, description, cost, quantity } = req.body;
    const result = {name, description, cost, quantity}
    console.log(result)

    const reviewAdd = await dbModel.addPurchase(result);
    if (reviewAdd) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});
   
module.exports = router;
