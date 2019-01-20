const mongoose = require('mongoose');
const now = require("performance-now");

mongoose.connect('mongodb://127.0.0.1:27017', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected');
  }
});

const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_id: Number,
  product_title: String,
  vendor_name: String,
  review_average: Number,
  review_count: Number,
  answered_questions: Number,
  list_price: String,
  discount: String,
  price: String,
  prime: Boolean,
  description: String,
  photos: [{
    photo_id: String,
    main_url: String,
    zoom_url: String,
    main_photo: Boolean,
  }],
});

const Products = mongoose.model('Products', productSchema);

const test = (totalTime, count) => {
  const id = Math.random() * 10000000;
  const start = now();
  Products.find({ product_id: id }).then(() => {
    const end = now();
    const time = Number(end) - Number(start);
    totalTime += time;
    if (count === 1000) {
      console.log(totalTime / 1000);
      return;
    }
    count += 1;
    test(totalTime, count);
  });
};

test(0, 0);