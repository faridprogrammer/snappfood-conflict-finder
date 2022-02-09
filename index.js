#!/usr/bin/env node

const fs =  require('fs');
const os =  require('os');
const https = require("https");

const token = fs.readFileSync(`token.txt`, 'utf8');

const options = {
    hostname: 'snappfood.ir',
    port: 443,
    method: 'GET',
    headers: {
        "authorization": token
    }
};

let totalLoss = 0;
let orderCount = 0;

function processItems(page) {

    let path = `/mobile/v1/order/reorder?lat=35.774&long=51.418&optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.0&UDID=0a0280a7-4eb7-40a3-a71a-04fc1f04d189&page=${page}&size=2&locale=fa`
    options.path = path;
    const req = https.request(options, res => {
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });

        res.on('end', () => {
            let orders = JSON.parse(rawData);
            if (orders.data.orders.length == 0) {

                if (totalLoss) {
                    console.log(`------------------------------------------------------------------------------------`);
                    console.log(`                           Order count = ${orderCount}                              `);
                    console.log(`-------------------------------------------------------------------------------------`)
                    console.log(`                           Your total Loss = ${totalLoss}`);
                    console.log(`-------------------------------------------------------------------------------------`)

                }
                else {
                    console.log(`       `);
                    console.log(`       `);
                    console.log(`-------------------------------------------------------------------------------------`)
                    console.log(`                                   All good! :)`);
                    console.log(`-------------------------------------------------------------------------------------`)
                }
                return;
            }
            for (const order of orders.data.orders) {
                orderCount = orderCount + 1;

                const dbVatAmount = order.vatAmount;

                if (!dbVatAmount)
                    continue;

                let calculatedPriceSum = 0;
                for (const product of order.products) {
                    const productPrice = product.price;
                    const productDiscount = product.discount;
                    calculatedPriceSum = calculatedPriceSum + (productPrice - productDiscount);
                }

                let calculatedVatAmount = calculatedPriceSum * 0.09;;
                if (calculatedVatAmount < dbVatAmount) {
                    console.log(`OrderId = ${order.orderId}, OrderTitle = ${order.vendorTitle}, OrderTime = ${order.date}-${order.time}`);
                    console.log(`Correct VAT = ${calculatedVatAmount}, SnappFood VAT = ${dbVatAmount}`);
                    console.log(`-------------------------------------------------------------------------------------`)
                    totalLoss = totalLoss + (dbVatAmount - calculatedVatAmount);
                }
            }
            processItems(page + 1);
        });

    });

    req.on('error', error => {
        console.error(error)
    });

    req.end();
}

processItems(0);
