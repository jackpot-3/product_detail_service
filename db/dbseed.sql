\COPY products (id, product_title, vendor_name, review_average, review_count, answered_questions, list_price, discount, price, prime, description) FROM ./data1.tsv (DELIMITER E'\t');

\COPY photos (main_url, zoom_url, product_id, main_photo) FROM ./photo_csv.csv (delimiter ',');