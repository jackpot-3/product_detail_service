const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/admin', { useNewUrlParser: true, poolSize: 1000 });


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

//  Read / GET - read an item

const getProduct = (req, res) => {
  const id = req.params.productId;
  Products.find({ product_id: id }, { photos: 0, description: 0, product_title: 0 }, (error, response) => {
    if (error) {
      res.sendStatus(404);
    } else {
      res.send(response[0]);
    }
  });
};

const getPhotos = (req, res) => {
  const id = req.params.productId;
  Products.find({ product_id: id }, { photos: 1 }).then((result) => {
    res.send(result[0].photos);
  });
};

const deleteProduct = (req, res) => {
  const id = req.params.productId;
  Products.remove({ product_id: id}).then((err) => {
    if (err) {
      res.send(err);
    } else {
      console.log('record deleted');
      res.send('record deleted');
    }
  });
};

const deletePhoto = (req, res) => {
  const id = req.params.productId;
  const photoId = req.params.photoId;
  console.log(photoId);
  Products.find({ product_id: id }).then((result) => {
    let current = result[0];
    console.log(current.photos.length);
    for (let i = 0; i < current.photos.length; i += 1) {
      if (current.photos[i].photo_id === photoId) {
        console.log('BANG!');
        current.photos.splice(i, 1);
        Products.update({ product_id: id }, current).then(()=> {
          res.send('photo ' + photoId + ' removed');
        });
      }
    }
  });
};

const updateProduct = (req, res) => {
  const id = req.params.productId;
  console.log(req.body);
};

// Update / PUT - update an item
// const updateProduct(id, thisField, newVal, callback) {
//   Products.updateOne({"product_id": id.toString()}, { thisField: newVal }, (error, result) => {
//     if (error) {
//       console.log(error)
//     } else {
//       callback(result);
//     }
//   })
// }


module.exports = {
  getProduct,
  getPhotos,
  deletePhoto,
  deleteProduct,
  updateProduct,
};