var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,

	//my username
	user: "root",

	//my password
	password: "Soccer12",
	database: "bamazon_db"
});
connection.connect(function(err){
	if (err) throw err;
	console.log("conneted as id" + connection.threadId);
	
});

	run();


function getQuantity(getId, nPrice){

	//asks user how many of the item they would like to purchase


	inquirer.prompt([
	{
		type: "input",
		name: "num",
		message: "How many would you like to buy?",
	}
	]).then(function(answer){

		//then stores the answer in a new variable
		var custNum = answer.num;
	
	//makes connection with mysql- specifically the stock quantity from the table: products
	 connection.query("SELECT stock_quantity FROM products", function(err, res){
	 	if (err) throw err;

	 	//soves the quantity for that specific item in variable
	 	var stock = res[getId-1].stock_quantity;  
	
	 	if (custNum <= stock){
               console.log("We have enough in stock!");
               
               
              var newStock = stock - custNum;
              
              //updates mysql to reflect the new quantity
               connection.query(
               	"UPDATE products SET ? WHERE ?",
               	[
               		{
               			stock_quantity: newStock
               		},
               		{
               			id: custNum
               		}
              		
                 ],
                function(err){
                 	if(err) throw err;

                 	connection.end();
                 }
                );
          }
            
	 	else {
	 		console.log("Inefficient quantity!");
	 		repeat();
	 		}

		var total = nPrice * custNum;
	    console.log("Total Cost of Purchase: $" + total);
	    
	 		});

	 });	
}

function getPrice(){

	inquirer.prompt([
	{
		type: "input",
		name: "item",
	    message: "Insert ID of a item you would like to purchase.",    
	}]).then(function(answer){
		
		var custId = answer.item;

		connection.query("SELECT  id, price FROM products", function(err, res){
			if (err) throw err;

			var getId;

			for ( var i = 0; i < res.length; ++i){
				if (custId == res[i].id){
					getId = res[i].id;
				}
			}
			nPrice = res[getId-1].price;
			getQuantity(getId, nPrice);
	    });
	    
	});
}	

function displayCatalog() {
	console.log("Catalog");
	var query = "SELECT * FROM products";
    connection.query(query, function(err, res){
	   	console.log("err");

		for (var i = 0; i < res.length; i++) {
			console.log("\n" + res[i].id + " Product Name: " + res[i].product_name + "\nDeptartment name: " + res[i].dept_name + 
			"\nPrice: " + res[i].price + "\nQuantity in stock: " + res[i].stock_quantity );
		}

		getPrice();
	});
}


function run(){

	displayCatalog();
	









}