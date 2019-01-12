const csvWriter = require('csv-write-stream');
const fs = require('file-system');
const faker = require('faker');

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
    const record = [uniqueId, productTitle, vendorName, reviewAverage, reviewCount, answeredQuestions, listPrice, discount, price, prime, description];
    let string = record.join('|');
    string += '\n';
    bigBoyString += string;
  }
  fs.appendFile('data1.csv', bigBoyString, (err) => {
    if (err) {
      console.log(err);
    } else {
      const newRows = rows + 50000;
      console.log(newRows);
      buildString(newRows);
    }
  });
};

//  generate a random average review score between 1 star and five stars
const reviewAverageGenerator = () => {
  const possibleScores = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const randomScore = Math.floor(Math.random() * 9);
  const result = possibleScores[randomScore];
  return result;
};


buildString(0);