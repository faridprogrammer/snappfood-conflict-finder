const orders = require('./data/orders.json')
let totalLoss = 0;
let orderCount = 0;

for (const order of orders.data.orders) {
    const dbVatAmount = order.vatAmount;
    orderCount = orderCount + 1;

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

if (totalLoss) {
    console.log(`-------------------------------------------------------------------------------------`);
    console.log(`                           Orders count = ${orderCount}                              `);
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
