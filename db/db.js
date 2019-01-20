
const { Pool } = require('pg')

const pool = new Pool({
  host: '18.220.88.83',
  port: 5432,
  user: 'postgres',
  password: 'root',
  database: 'elliottgranoff',
  max: 2000,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.connect();


const saveProductRecord = (arrayRecord) => {
  const query = `INSERT INTO products 
  (product_title, vendor_name, review_average, review_count, answered_questions,
  list_price, discount, price, prime, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  pool.query(query, arrayRecord, (err) => {
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
  pool.query(query, (err) => {
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
  pool.query(query, (err, photos) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(photos);
    }
  });
};

const getProduct = (req, res) => {
  const id = req.params.productId;
  const query = `SELECT * FROM products WHERE id = ${id};`;
  pool.query(query, (err, data) => {
    if (err) {
      res.send('broken');
    } else {
      res.send(data);
    }
  });
};

const deleteProduct = (req, res) => {
  const id = req.params.productId;
  const query = `DELETE FROM PRODUCTS WHERE ID = ${id}`;
  pool.query(query, (err, data) => {
    
  })
}


module.exports = {
  saveProductRecord,
  savePhotoRecord,
  getPhotos,
  getProduct,
};
