var fs = require('fs');

const photoGenerator = (productId) => {
  const randomIndex = Math.floor(Math.random() * products.length);
  const randomProduct = products[randomIndex]; 
  let rowSet = '';
  for (let j = 0; j < randomProduct.length; j++) {
    if (j === 0) {
      let row = [randomProduct[j][0], randomProduct[j][1], productId, 1].join(',');
      row += '\r\n';
      rowSet += row;
    }
    let row = [randomProduct[j][0], randomProduct[j][1], productId, 0].join(',');
    row += '\r\n';
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

const fileWriter = (row) => {
  if (row >= 10000000) {
    return;
  }
  let bigString = '';
  for (let i = 1; i < 10000; i++) {
    const tempString = photoGenerator(row + i);
    bigString += tempString;
  }
  fs.appendFile('photo_csv.csv', bigString, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    const newRow = row + 10000;
    console.log(newRow);
    fileWriter(newRow);
  });
};
fileWriter(0);