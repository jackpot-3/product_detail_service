require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const db = require('./../db/db.js');
const mongo = require('./../db/mongodb.js');

//  ///////////////////////////////////
const app = express();

// app.use('/:productId', express.static(path.join(__dirname, './../client/dist/')));
app.use('/static', express.static(path.join(__dirname, './../client/dist/')));
app.use(cors());

console.log(db);

const PORT = 3004;
app.listen(PORT, () => { console.log('listening on port ' + PORT); });

app.get('/photos/:productId', mongo.getPhotos);

app.get('/products/:productId', db.getProduct);

app.post('/photos/post/:productId', db.savePhotoRecord);

app.post('/products/post', db.saveProductRecord);

app.on('uncaughtException', (err) => {
  console.log(err);
});


// app.put('/products/:productId', db.updateProduct);

// app.put('/photos/:photoId', db.updatePhoto);

app.delete('/products/:productId', mongo.deleteProduct);

app.delete('/photos/:productId/:photoId', mongo.deletePhoto);

app.put('/products/:productId', mongo.updateProduct);
