const database = include("/databaseConnection");

async function getAllPurchase() {
  let sqlQuery = `
        SELECT purchase_item_id, item_name, item_description, cost, quantity
        FROM purchase_item;
    `;

  try {
    const results = await database.query(sqlQuery);
    console.log("results: ", results[0]);
    return results[0];
  } catch (err) {
    console.log("Cannot select item table");
    console.log(err);
    return null;
  }
}

// async function getAllPurchase() {
//   let sqlQuery = `
//         SELECT COUNT(cost * quantity)
//         FROM purchase_item;
//     `;

//   try {
//     const results = await database.query(sqlQuery);
//     console.log("results: ", results[0]);
//     return results[0];
//   } catch (err) {
//     console.log("Cannot select item table");
//     console.log(err);
//     return null;
//   }
// }

async function updateItem(id, quantity) {

  let sqlUpdatePurchase = `
        UPDATE purchase_item
        SET quantity = :quantity
        WHERE purchase_item_id = :id;
    `;

  let params = {
    quantity: quantity,
    id: parseInt(id),
  };

  console.log(sqlUpdatePurchase);

  try {
    const results = await database.query(sqlUpdatePurchase, params);
    let insertedID = results.insertId;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// async function subItem(postData) {
//   console.log("postData: ", postData);

//   let sqlSubPurchase = `
//         UPDATE purchase_item (quantity)
//         VALUES (:quantity - 1)
//         WHERE purchase_item_id = :purchase_item_id;
//     `;

//   let params = {
//     quantity: postData.quantity,
//   };

//   console.log(sqlSubPurchase);

//   try {
//     const results = await database.query(sqlSubPurchase, params);
//     let insertedID = results.insertId;

//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// }

async function addPurchase(postData) {
  console.log("postData: ", postData);

  let sqlInsertItem = `
        INSERT INTO purchase_item (item_name, item_description, cost, quantity)
        VALUES (:name, :description, :cost, :quantity);
    `;

  let params = {
    name: postData.name,
    description: postData.description,
    cost: postData.cost,
    quantity: postData.quantity,
  };

  console.log(sqlInsertItem);

  try {
    const results = await database.query(sqlInsertItem, params);
    let insertedID = results.insertId;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteItem(id) {
  let sqlDeleteRestaurant = `
        DELETE FROM purchase_item
        WHERE purchase_item_id = :id
    `;
  let params = {
    id: id,
  };
  console.log(sqlDeleteRestaurant);
  try {
    await database.query(sqlDeleteRestaurant, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = { 
  getAllPurchase,
  updateItem,
  addPurchase,
  deleteItem,
};
