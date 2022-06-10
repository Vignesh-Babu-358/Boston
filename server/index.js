const fetch = require("node-fetch");

const btoa = require("btoa");

const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose")
const MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
const store_name = require('./store_schema')
const order_details = require('./order_schema')
const cors = require('cors');
const { resourceLimits } = require("worker_threads");

app.use(cors());

var api_key = '028569c8029147148b7f673c4461f37c'
var api_secret = 'caf1877eb332459e902cdc32021663df'
var message = api_key + ":" + api_secret
console.log(message);
var message_bytes = Buffer.from(message, 'ascii');
console.log(message_bytes);
var base64_bytes = btoa(message_bytes)
console.log(base64_bytes);
var myHeaders = new fetch.Headers();
myHeaders.append("Host", "ssapi.shipstation.com");
myHeaders.append("Authorization", "Basic " + base64_bytes);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://ssapi.shipstation.com/stores?marketplaceId=8", requestOptions)
    .then(response => response.json())
    .then(result => {
        const count = store_name.countDocuments({}, (err, c) => {
            console.log(c);
            if (c != result.length) {
                for (var i = 0; i < result.length; i++) {
                    const poststorename = new store_name({
                        Shop_name: result[i].storeName,
                        Shop_ID: result[i].storeId,
                        Total_shop: result.length
                    });
                    const savestorename = poststorename.save();
                }
            }
            for (var j = 0; j < c; j++) {
                //console.log(c);
                const v = result[j].storeId;
                console.log(v);
                fetch(`https://ssapi.shipstation.com/orders?storeid=${v}&sortDir=DESC&orderdate=2022-04-21T0:0:10.0000000`,
                    requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        for (var i = 0; i < result.orders.length; i++) {
                            var l = result.orders[i].items.length;
                            if (l > 0) {
                                const postorderdetail = new order_details({
                                    Reciept_number: result.orders[i].orderKey,
                                    Order_date: result.orders[i].orderDate,
                                    Shipping_address: [result.orders[i].shipTo.name,
                                    result.orders[i].shipTo.street1,
                                    result.orders[i].shipTo.city, result.orders[i].shipTo.country],
                                    Order_value: result.orders[i].orderTotal,
                                    Shipping_cost: result.orders[i].shippingAmount,
                                    Tax_amount: result.orders[i].taxAmount,
                                    Gift_message: result.orders[i].giftMessage,
                                    Quantity: l,
                                    Image_link: result.orders[i].items[l - 1].imageUrl,
                                    Store_ID: result.orders[i].advancedOptions.storeId
                                });
                                const savedetails = postorderdetail.save();
                            }
                            else {
                                const postorderdetail = new order_details({
                                    Reciept_number: result.orders[i].orderKey,
                                    Order_date: result.orders[i].orderDate,
                                    Shipping_address: [result.orders[i].shipTo.name,
                                    result.orders[i].shipTo.street1,
                                    result.orders[i].shipTo.city, result.orders[i].shipTo.country],
                                    Order_value: result.orders[i].orderTotal,
                                    Shipping_cost: result.orders[i].shippingAmount,
                                    Tax_amount: result.orders[i].taxAmount,
                                    Gift_message: result.orders[i].giftMessage,
                                    Quantity: 0,
                                    Image_link: null,
                                    Store_ID: result.orders[i].advancedOptions.storeId
                                });
                                const savedetails = postorderdetail.save();
                            }
                        }
                    }).catch(error => console.log('error', error));



            }


        });
    }).catch(error => console.log('error', error));


app.post("/", async (req, res) => {
    res.json(savestorename);
})

app.post("/orders", async (req, res) => {
    res.json(savedetails);
})
app.get("/", async (req, res) => {
    const getstorename = await store_name.find({}).select({ _id: 0, Shop_name: 1, Total_shop: 1, Shop_ID: 1 });
    res.json(getstorename);
})
app.get("/orders", async (req, res) => {
    const getorderdetails = await order_details.find({}).select({ _id: 0 });
    res.json(getorderdetails);
})

app.listen(4000, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Server started on port 4000");
    }
});

mongoose.connect('mongodb://localhost:27017/boston_data', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("Not connected");
    }
    else {
        console.log("Database connected successfully");

    }

});


