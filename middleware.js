// Prepare the needed libraries for the middleware
const jwt = require('jsonwebtoken')
const {response} = require("express");
const {decode} = require("jsonwebtoken");
const tokenKey = process.env.TOKEN_KEY
console.log(tokenKey)
// Bring the app and make the endpoints of login and orders
module.exports = function (app) {
    app.post('/login', async (req, res) => {
        // This simulates a login, in this case it is triggered as soon as '/' is loaded with default username and pass
        // allowing to test the use of the TOKEN
        console.log("Recieving request")
        const loginData = req.body.loginData;
        const username = "Isaac"
        const password = "Scoobyduh"

        if (username === loginData.username && password === loginData.password) {
            // create token
            const token = jwt.sign({username: username}, tokenKey, {expiresIn: '24h'})
            // Printing to test and demonstrate purposes
            console.log("Returning token: " + token)
            return res.status(200).send({token: token});
        }
        return res.status(401).send({error: "Invalid user id and/or password"})
        }
    )

    // Assuming that not every endpoint requires authorization, this function allow us to
    // choose when to check it. It takes the request headers and evaluates the token
    const checkToken = (req, res, next) => {
        let token = req.headers['authorization'];
        // In case it is empty
        if(token === undefined) {
            console.log("Returning due to error")
            return res.status(401).send({"error": "Token is not present"})
        }
        // Header format must be: 'authorization': "Bearer " + token
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)
        }
        if(token){
            jwt.verify(token, tokenKey, (err, decoded) => {
                // To handle errors in case something goes wrong
                if(err){
                    return res.json({
                        success: false,
                        message: "Token is not right.."
                        }
                    )
                }
                else{
                    req.decoded = decoded;
                    next();
                }
            } )
        } else {
            // To handle errors in case something goes wrong
            return res.json({
                success: false,
                message: "Token is not right.."
            })
        }
    }

    // Define a route for a sample API endpoint
    app.get('/orders',  (req, res) => {
        // First, validate the Token before gathering the orders
        checkToken(req, res, async() => {
            console.log("SENDING ORDERS - TOKEN APPROVED")
            orders_data = await require('./orders.js')
            // console.log(" Analyzing ...." + orders_data)
            res.json(orders_data);
        })
    });
}