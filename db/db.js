
const pg = require('pg');

const connection = pg.createConnection({
  host: '172.17.0.2',
  user: 'root',
  password: 'Mightymang0',
  database: 'product_overview',
});

connection.connect();


const saveProductRecord = (arrayRecord) => {
  const query = `INSERT INTO products 
  (product_title, vendor_name, review_average, review_count, answered_questions,
  list_price, discount, price, prime, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, arrayRecord, (err) => {
    if (err) {
      throw (err);
    } else {
      console.log('success');
    }
  });
};

const savePhotoRecord = (mainUrl, zoomUrl, productId, mainPhotoBool) => {
  const query = `INSERT INTO photos (main_url, zoom_url, product_id, main_photo) 
  VALUES ('${mainUrl}', '${zoomUrl}', ${productId}, ${mainPhotoBool});`;
  connection.query(query, (err) => {
    if (err) {
      throw (err);
    } else {
      console.log('success');
    }
  });
};

const getPhotos = (req, res) => {
  const productId = req.params.productId;
  const query = `SELECT * FROM photos WHERE product_id = ${productId};`;
  connection.query(query, (err, photos) => {
    if (err) {
      console.log(err);
      res.statusCode(500).send();
    } else {
      res.send(photos);
    }
  });
};

const getProduct = (req, res) => {
  const id = req.params.productId;
  const query = `SELECT * FROM products WHERE id = ${id};`;
  connection.query(query, (err, data) => {
    if (err) {
      res.statusCode(500).send();
    } else {
      res.send(data);
    }
  });
};


module.exports = {
  saveProductRecord,
  savePhotoRecord,
  getPhotos,
  getProduct,
};
