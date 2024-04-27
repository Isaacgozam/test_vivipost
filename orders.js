// Prepare the needed libraries for orders
var mysql = require('mysql');
const processOrders = require('./business.js');

// Prepare con to be used with mysql
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// This is the logic to format the data:
// Since they need a different structure than what's on the database, lets gather two sections with JOIN and then
// append them as needed with a for
var results_one = []
var mysql_one = "SELECT * FROM tbl_product JOIN tbl_order_product ON " +
    "tbl_product.id_product = tbl_order_product.id_product"
var results_order_user = ""
var mysql_order_user = "SELECT * FROM tbl_order JOIN tbl_user ON " +
    "tbl_order.id_user = tbl_user.id_user"

const fetchDataFromDatabase = () => {
    return new Promise((resolve, reject) => {
        // first gathering
        con.connect(function(err) {
            if (err) throw err;
             con.query(mysql_one, function (err, results, fields) {
                if (err) throw err;
                results_one = JSON.parse(JSON.stringify(results))
                 // second gathering
                 con.query(mysql_order_user, function (err, results, fields) {
                    if (err) throw err;
                    results_order_user = JSON.parse(JSON.stringify(results))
                    // appending them under "products"
                    for (var index = 0; index < results_order_user.length ; index++) {
                        results_order_user[index].products = []
                        for (var index_two = 0; index_two < results_one.length ; index_two++) {
                            if (results_one[index_two].id_order === results_order_user[index].id_order) {
                                results_order_user[index].products.push(results_one[index_two])
                            }
                        }
                    }
                    // Let's process the business logic pricing
                    processOrders(results_order_user);
                    // And return
                    resolve(results_order_user)
                });
            });
        });
    });
};
module.exports = fetchDataFromDatabase()
