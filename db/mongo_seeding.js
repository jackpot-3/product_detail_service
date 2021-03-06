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
    product_id: Number,
    main_photo: Boolean,
  }],
});

productSchema.index({ product_id: 1 }, { unique: true });


const Products = mongoose.model('Products', productSchema);

mongoose.connect('mongodb://127.0.0.1:27017');

mongoose.connection.on('open', () => {
  console.log('connected');
  let insertCount = 0;
  Products.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('collection removed');
      let addedCount = 0;
      let currentSet = [];
      const s = fs.createReadStream('./../mongo.csv')
        .pipe(es.split())
        .pipe(es.mapSync((line) => {
          s.pause();
          // process line here and call s.resume() when rdy
          // function below was for logging memory usage
    
          const data = line.split('|');
    
          currentSet.push({
            product_id: Number(data[0]),
            product_title: data[1],
            vendor_name: data[2],
            review_average: Number(data[3]),
            review_count: Number(data[4]),
            answered_questions: Number(data[5]),
            list_price: data[6],
            discount: data[7],
            price: data[8],
            prime: Number(data[9]),
            description: data[10],
            photos: [{
              photo_id: data[11],
              main_url: data[12],
              zoom_url: data[13],
              product_id: data[14],
              main_photo: Number(data[15]),
            }, {
              photo_id: data[16],
              main_url: data[17],
              zoom_url: data[18],
              product_id: data[19],
              main_photo: Number(data[20]),
            }, {
              photo_id: data[21],
              main_url: data[22],
              zoom_url: data[23],
              product_id: data[24],
              main_photo: Number(data[25]),
            }, {
              photo_id: data[26],
              main_url: data[27],
              zoom_url: data[28],
              product_id: data[29],
              main_photo: Number(data[30]),
            }],
          });
          addedCount += 1;
          if (addedCount === 25000) {
            Products.collection.insert(currentSet, (error) => {
              if (error) {
                console.log(error);
                process.end();
              } else {
                insertCount += 25000;
                console.log('currently' + insertCount + 'saved');
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
