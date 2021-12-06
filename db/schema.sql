DROP DATABASE IF EXISTS welp_db;
CREATE DATABASE welp_db;

USE welp_db;

CREATE TABLE books(
    PRIMARY KEY id INT NOT NULL AUTO_INCREMENT,
    book_name VARCHAR(100) NOT NULL
);

CREATE TABLE reviews(
    id INT NOT NULL,
    book_id INT NOT NULL,
    review TEXT,
    FOREIGN KEY (book_id)
    REFERENCES books(id)
    ON DELETE SET NULL
)

CREATE TABLE users(
    id INT NOT NULL,
)