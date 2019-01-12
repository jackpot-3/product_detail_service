const mongoose = require('mongoose');
const fs = require('fs');
const es = require('event-stream');

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

mongoose.connect('mongodb://127.0.0.1:27017');

mongoose.connection.on('open', () => {
  Products.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('collection removed');
      let addedCount = 0;
      let currentSet = [];
      const s = fs.createReadStream('mongo.csv')
        .pipe(es.split())
        .pipe(es.mapSync((line) => {
          s.pause();
          // process line here and call s.resume() when rdy
          // function below was for logging memory usage
    
          const data = line.split('|');
    
          currentSet.push({
            product_id: data[0],
            product_title: data[1],
            vendor_name: data[2],
            review_average: data[3],
            review_count: data[4],
            answered_questions: data[5],
            list_price: data[6],
            discount: data[7],
            price: data[8],
            prime: data[9],
            description: data[10],
            photos: [{
              photo_id: data[11],
              main_url: data[12],
              zoom_url: data[13],
              main_photo: data[14],
            }, {
              photo_id: data[15],
              main_url: data[16],
              zoom_url: data[17],
              main_photo: data[18],
            }, {
              photo_id: data[19],
              main_url: data[20],
              zoom_url: data[21],
              main_photo: data[22],
            }, {
              photo_id: data[23],
              main_url: data[24],
              zoom_url: data[25],
              main_photo: data[26],
            }],
          });
          addedCount += 1;
          if (addedCount === 100000) {
            Products.collection.insert(currentSet, (error) => {
              if (error) {
                console.log(error);
              } else {
                console.log('100000 saved');
                currentSet = [];
                addedCount = 0;
                s.resume();
              }
            });
          } else {
            s.resume();
          }
          // resume the readstream, possibly from a callback
        })
          .on('error', (err) => {
            console.log('Error while reading file.', err);
          })
          .on('end', () => {
            console.log('Read entire file.');
            mongoose.disconnect();
            process.exit();
          }));
    }
  });
});
