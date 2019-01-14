
-- ***** PRODUCT OVERVIEW SCHEMA DESIGN ****
drop schema if exists public cascade;

grant usage on schema public to public;
grant create on schema public to public;
create schema public;

CREATE TABLE IF NOT EXISTS products (
	id INT NOT NULL,
	product_title text NOT NULL,
	vendor_name varchar(50) NOT NULL,
	review_average DECIMAL, 
	review_count int DEFAULT 0,
	answered_questions int, 
	list_price varchar(15) NOT NULL,
	discount varchar(4),
	price varchar(15) NOT NULL,
	prime BOOLEAN NOT NULL,
	description text,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS photos (
	photo_id SERIAL PRIMARY KEY,
	main_url varchar(255) NOT NULL,
	zoom_url varchar(255) NOT NULL,
	product_id int,
	main_photo BOOLEAN NOT NULL,
	FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE INDEX product_id ON photos (product_id);
