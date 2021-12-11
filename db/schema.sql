DROP DATABASE IF EXISTS welp_db;
CREATE DATABASE welp_db;

USE welp_db;

CREATE TABLE browseCards (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bookName TEXT NOT NULL,
    summaryText TEXT NOT NULL,
    filePath TEXT NOT NULL,
);

CREATE TABLE bookReviews (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bookName TEXT NOT NULL,
    summaryText TEXT NOT NULL,
    filePath TEXT NOT NULL,
    FOREIGN KEY (seed_id),
    REFERENCES browseCards(id)
    ON DELETE SET NULL
);