
USE zy21586;

# ==================================== customer relation ==========================================================
DROP TABLE IF EXISTS Customer;
CREATE TABLE Customer (
  customer_ID INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Automatically generated Customer_ID',
  username VARCHAR(16) UNIQUE NOT NULL COMMENT 'User Name within 4-16 chars.',
  password VARCHAR(32) NOT NULL COMMENT 'User password within 6-32 chars.',
  first_name VARCHAR(45) NOT NULL COMMENT 'User real first name',
  last_name VARCHAR(45) NOT NULL COMMENT 'User real last name',
  telephone VARCHAR(50) NOT NULL COMMENT '(Country) + area (can be null) + number',
  email VARCHAR(255) NOT NULL,
  passport_ID VARCHAR(45) UNIQUE NOT NULL COMMENT 'Unique passport ID avoid users from creating multiple accounts.',
  country VARCHAR(45) NOT NULL,
  PRIMARY KEY (customer_ID)
);
# ==================================== mask relation ==========================================================
DROP TABLE IF EXISTS Mask;
CREATE TABLE Mask (
  mask_id SMALLINT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  mask_type VARCHAR(45) NOT NULL,
  PRIMARY KEY (mask_id)
);

# ==================================== Rep relation ==========================================================
DROP TABLE IF EXISTS Rep;
CREATE TABLE Rep (
  rep_ID INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'Automatically generated Customer_ID',
  username VARCHAR(16) UNIQUE NOT NULL COMMENT 'User Name with 4-16 chars.',
  password VARCHAR(32) NOT NULL COMMENT 'User password with 6-32 chars.',
  first_name VARCHAR(45) NOT NULL COMMENT 'User real first name',
  last_name VARCHAR(45) NOT NULL COMMENT 'User real last name',
  telephone VARCHAR(100) NOT NULL COMMENT '(Country) + area (can be null) + number',
  email VARCHAR(255) NOT NULL,
  country VARCHAR(45) NULL DEFAULT NULL COMMENT 'Can be null at first',
  quota INT NULL DEFAULT 0,
  working_status VARCHAR(255) NOT NULL COMMENT 'active(assigned/to be assigned), left(not working any more, for further statistics)',
  PRIMARY KEY (rep_ID));


# ==================================== Order relation ==========================================================
DROP TABLE IF EXISTS Orders;
CREATE TABLE Orders (
  order_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_ID INT UNSIGNED NOT NULL,
  rep_ID INT UNSIGNED NOT NULL,
  start_date DATETIME NOT NULL,
  status VARCHAR(20) NOT NULL COMMENT '(completed/processing/(cancelled)/cancelled by user/cancelled by rep)', 
  post_status VARCHAR(45) NOT NULL COMMENT '(not sold/normal/abnormal/abnormal to be reviewed)',
  type1_quantity INT UNSIGNED NOT NULL,
  type2_quantity INT UNSIGNED NOT NULL,
  type3_quantity INT UNSIGNED NOT NULL,
  type1_unit_price DECIMAL(10,2) NOT NULL COMMENT 'Because mask unit price may change by manager, these attributes are for further statistics purpose.',
  type2_unit_price DECIMAL(10,2) NOT NULL,
  type3_unit_price DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_ID),
  CONSTRAINT customer_ID
    FOREIGN KEY (customer_ID)
    REFERENCES Customer (customer_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT rep_ID
    FOREIGN KEY (rep_ID)
    REFERENCES Rep (rep_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
# ==================================== quota_request relation ==========================================================
DROP TABLE IF EXISTS Quota_Request;
CREATE TABLE Quota_Request (
  request_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  request_date DATETIME NOT NULL,
  rep_ID INT UNSIGNED NOT NULL,
  quota_quantity INT UNSIGNED NOT NULL,
  request_status VARCHAR(20) NOT NULL COMMENT 'no response/updated/regranted/refused',
  PRIMARY KEY (request_ID),
  CONSTRAINT rep_ID FOREIGN KEY (rep_ID)
    REFERENCES Rep (rep_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
 
    
