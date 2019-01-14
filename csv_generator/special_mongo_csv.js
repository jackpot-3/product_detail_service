const csvWriter = require('csv-write-stream');
const fs = require('file-system');
const faker = require('faker');
const promise = require('promise');

//  helper functions
let discount;
const discountGenerator = (stringPrice) => {
    let price = Number(stringPrice.slice(1));
    const randomNum = Math.floor(Math.random() * 10) + 1;
    const potentialDiscounts = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7];
    const randomIndex = Math.floor(Math.random() * 8);
    if (randomNum <= 7) {
        discount = potentialDiscounts[randomIndex];
        const dollarsOff = price * discount;
        price -= dollarsOff;
        discount = ((discount * 100).toString() + '%');
        return ('$' + price.toFixed(2).toString());
    }
    return stringPrice;
};


//  generate a stringified object of a random number of loremIpsum paragraphs
const descriptionGenerator = () => {
    const randomNum = Math.floor(Math.random() * 8) + 1;
    let descriptionArray = '';
    for (let i = 0; i < randomNum; i++) {
        descriptionArray += faker.lorem.paragraph();
    }
    return descriptionArray;
};

//  generate a random average review score between 1 star and five stars
const reviewAverageGenerator = () => {
    const possibleScores = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
    const randomScore = Math.floor(Math.random() * 9);
    const result = possibleScores[randomScore];
    return result;
};


const photoGenerator = (productId) => {
    const randomIndex = Math.floor(Math.random() * products.length);
    const randomProduct = products[randomIndex];
    let rowSet = '';
    for (let j = 0; j < randomProduct.length; j++) {
        if (j === 0) {
            let row = [randomProduct[j][0], randomProduct[j][1], productId, 1].join('|');
            row += '|';
            rowSet += row;
        }
        let row = [randomProduct[j][0], randomProduct[j][1], productId, 0].join('|');
        row += '|';
        rowSet += row;
    }
    return rowSet;
};


const products = [];
products.push([
    ['https://images-na.ssl-images-amazon.com/images/I/61bMV3oE-8L._SX879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61bMV3oE-8L._SL1010_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81s-7zDprgL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81s-7zDprgL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/61IVFlGBFKL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61IVFlGBFKL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/710iVeIJ8VL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/710iVeIJ8VL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/6108wq2-%2ByL._SY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/6108wq2-%2ByL._SL1500_.jpg']
]);
products.push([
    ['https://images-na.ssl-images-amazon.com/images/I/911bSgYftRL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/911bSgYftRL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/71OBoU4KN0L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/71OBoU4KN0L._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81ry941DTDL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81ry941DTDL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/91hhCXj9dbL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91hhCXj9dbL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81xm%2BPZlZQL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81xm%2BPZlZQL._SL1500_.jpg'],
]);
products.push([
    ['https://images-na.ssl-images-amazon.com/images/I/81OAEATjUAL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81OAEATjUAL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81%2BDlE33ZXL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81%2BDlE33ZXL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81PTwrJ5L9L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81PTwrJ5L9L._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/61QvN3AaetL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61QvN3AaetL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81PTwrJ5L9L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81PTwrJ5L9L._SL1500_.jpg'],
]);
products.push([
    ['https://images-na.ssl-images-amazon.com/images/I/81OO%2BFAOmpL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81OO%2BFAOmpL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/91j39xqQmYL._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91j39xqQmYL._SL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81Uh627QM1L._SX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81Uh627QM1L._SL1500_.jpg'],
]);
products.push([
    ['https://images-na.ssl-images-amazon.com/images/I/91Sv3ReNw1L._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91Sv3ReNw1L._UL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/714Xf4mfEHL._UY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/714Xf4mfEHL._UL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/816GemF356L._UY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/816GemF356L._UL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/81sR5lnPSEL._UY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/81sR5lnPSEL._UL1500_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/91unmglFkZL._UY879_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/91unmglFkZL._UL1500_.jpg'],
]);
products.push([
    ['https://images-na.ssl-images-amazon.com/images/I/61xO8iHvHGL._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61xO8iHvHGL.UL1000.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/61VqgbO1jeL._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61VqgbO1jeL._UL1000_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/61Q2VAxjXDL._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/61Q2VAxjXDL._UL1000_.jpg'],
    ['https://images-na.ssl-images-amazon.com/images/I/71f0rd1qtWL._UX679_.jpg', 'https://images-na.ssl-images-amazon.com/images/I/71f0rd1qtWL._UL1000_.jpg'],
]);

const buildString = (rows) => {
  if (rows >= 10000000) {
    return;
  }
  let bigBoyString = '';
  for (let i = 0; i < 50000; i++) {
    discount = null;
    const productTitle = `${faker.commerce.productName()} , ${faker.lorem.sentence()}`.slice(0, -1);
    const vendorName = faker.company.companyName();
    const reviewAverage = reviewAverageGenerator();
    const reviewCount = Math.round((Math.random() * 3000));
    const answeredQuestions = Math.round((Math.random() * 49) + 1);
    const listPrice = faker.commerce.price(15.00, 5000, 2, '$');
    const price = discountGenerator(listPrice);
    const prime = Math.round(Math.random());
    const description = descriptionGenerator();
    const uniqueId = rows + i;
    const photos = photoGenerator(rows + i);
    const record = [uniqueId, productTitle, vendorName, reviewAverage, reviewCount, answeredQuestions, listPrice, discount, price, prime, description, photos];
    let string = record.join('|');
    string += '\n';
    bigBoyString += string;
  }
  fs.appendFile('mongo.csv', bigBoyString, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newRows = rows + 50000;
      console.log(newRows);
      buildString(newRows);
    }
 });
}

buildString(0);