
USE zy21586;

# ============================ data clearing for test status ============================================================
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Quota_Request;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS Rep;
DROP TABLE IF EXISTS Mask;


# ============================ relation creation ============================================================

# create Customer relation ==========================================================

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

# create Mask relation ==========================================================

CREATE TABLE Mask (
  mask_id SMALLINT NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  mask_type VARCHAR(45) NOT NULL,
  PRIMARY KEY (mask_id)
);

# create Rep relation ==========================================================

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

# create Order relation ==========================================================

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
  CONSTRAINT customer_ID_fk
    FOREIGN KEY (customer_ID)
    REFERENCES Customer (customer_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT rep_ID_fk1
    FOREIGN KEY (rep_ID)
    REFERENCES Rep (rep_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
# create Quota_Request relation ==========================================================

CREATE TABLE Quota_Request (
  request_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
  request_date DATETIME NOT NULL,
  rep_ID INT UNSIGNED NOT NULL,
  quota_quantity INT UNSIGNED NOT NULL,
  request_status VARCHAR(20) NOT NULL COMMENT 'no response/updated/regranted/refused',
  PRIMARY KEY (request_ID),
  CONSTRAINT rep_ID_fk2
    FOREIGN KEY (rep_ID)
    REFERENCES Rep (rep_ID)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    

# ============================ data initialization ============================================================

# 1. Mask data initialization ==========================================================
INSERT INTO Mask
(mask_ID, unit_price, mask_type)
VALUES
(1, 4.50, 'N95 respirator'),
(2, 5.30, 'Surgical mask'),
(3, 6.70, 'Surgical N95 respirator');


# 2. Customer data initialization ==========================================================

INSERT INTO Customer
(username, password, first_name, last_name, telephone, email, passport_ID, country)
VALUES
# in Australia
('Mike', 'password', 'Mike', 'Lee', '(61)4324135135', 'mikelee@unnc.com', 'mikelee', 'Australia'),
('Rose', 'password', 'Rose', 'Plant', '(61)632519197', 'roseplant@unnc.com', 'roseplant', 'Australia'),
# in Brazil
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
# in China
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
# in Denmark
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China');
# in Egypt
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
# in Japan
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
# in United Kingdom
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
# in Mexico
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),
('Daniel', 'password', 'Daniel', 'YANG', '(86)15901184506', 'danielyang@unnc.com', 'danielyang', 'China'),

# 3. Rep data initialization ==========================================================



























