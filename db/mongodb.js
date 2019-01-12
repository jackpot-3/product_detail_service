const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017');
let db = mongoose.connection;

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

const createProduct = (product, callback) => {
  const entry = {
    product_id: product[0],
    product_title: product[1],
    vendor_name: product[2],
    review_average: product[3],
    review_count: product[4],
    answered_questions: product[5],
    list_price: product[6],
    discount: product[7],
    price: product[8],
    prime: product[9],
    description: product[10],
    photos: [{
      photo_id: product[11],
      main_url: product[12],
      zoom_url: product[13],
      main_photo: product[14],
    }, {
      photo_id: product[15],
      main_url: product[16],
      zoom_url: product[17],
      main_photo: product[18],
    }, {
      photo_id: product[19],
      main_url: product[20],
      zoom_url: product[21],
      main_photo: product[22],
    }, {
      photo_id: product[23],
      main_url: product[24],
      zoom_url: product[25],
      main_photo: product[26],
    }],
  };
  Products.insertOne(entry, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('entry added');
      callback();
    }
  });
};
//Read / GET - read an item

const getProduct = (id, callback) => {
  Products.findOne({"product_id": id.toString()}, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      callback(result);
    }
  });
};

//Update / PUT - update an item
const updateProduct(id, thisField, newVal, callback) {
  Products.updateOne({"product_id": id.toString()}, { thisField: newVal }, (error, result) => {
    if (error) {
      console.log(error)
    } else {
      callback(result);
    }
  })
}
//Delete / DELETE - delete an item


module.exports = db;