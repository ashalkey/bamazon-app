var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var resultsLength = 0;
var itemID;
var purchaseQuantity;

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    displayItems();
  });

function displayItems() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        resultsLength = results.length;
        var table = new Table({
        head: ["ID", "Product Name", "Department Name", "Price (USD)", "Stock Quantity"],
        colWidths: [5, 50, 25, 15, 20]
        });
        for (var i = 0; i < results.length; i++) {
            table.push([results[i].item_id, results[i].product_name, results[i].department_name, 
                        "$" + results[i].price,  results[i].stock_quantity]);
        }
        console.log(table.toString());
        purchasePrompt();
    });
    
};

function purchasePrompt() {

    inquirer.prompt([
        {
            name: "purchase_choice",
            type: "input",
            message: "Please provide the ID of the item you would like to buy",
            validate: validateID
        },
        {
            name: "purchase_quantity",
            type: "input",
            message: "Please enter the quantity you would like to purchase",
            validate: validateQuantity
        }
    ]).then(function (answer) {
        itemID = answer.purchase_choice - 1;
        purchaseQuantity = answer.purchase_quantity;
        evaluateOrder();
    });
};

function validateID(id) {

    if (id === 0 || isNaN(id) === true || id > resultsLength) {
        return "You must provide an ID that exists in the table of items provided above";
    }
    else
        return true;
};

function validateQuantity(quantity) {

    if (quantity === 0 || isNaN(quantity) === true) {
        return "The Quantity must be an integer and be greater than 0";
    }
    else
    return true;

};

// queries the database to ensure that there is enough product to sell the user, 
// otherwise prints a message notifying that there are not enough items in stock
function evaluateOrder() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        var difference = results[itemID].stock_quantity - purchaseQuantity;


        itemID++;
        if (difference <= 0) {
            console.log("Insufficient Quantity!");
            displayItems();
        }

        else {
            var finalPrice = Number.parseFloat(purchaseQuantity * results[itemID - 1].price).toFixed(2);
            connection.query("UPDATE products SET ? WHERE ?",
                [{ stock_quantity: difference },
                { item_id: itemID }],
                function (error) {
                    if (error) throw error;
                    console.log("Purchase of",results[itemID - 1].product_name ,"Complete! Your total is: $", finalPrice);
                });
                displayItems();
        }
    });
};