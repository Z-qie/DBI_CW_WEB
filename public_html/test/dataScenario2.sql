
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
  mask_ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
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
  working_status VARCHAR(20) NOT NULL COMMENT 'active(assigned/to be assigned), left(not working any more, for further statistics)',
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
(unit_price, mask_type)
VALUES
(4.50, 'N95 respirator'),
(5.30, 'Surgical mask'),
(6.70, 'Surgical N95 respirator');


# 2. Customer data initialization ==========================================================

INSERT INTO Customer
(username, password, first_name, last_name, telephone, email, passport_ID, country)
VALUES
# in Australia
('Mike', 'password', 'Mike', 'Lee', '(61)4324135135', 'mikelee@unnc.com', 'mikelee', 'Australia'),
# in Brazil
('Eman', 'password', 'Eman', 'Summers', '(55)21342344', 'emansummers@unnc.com', 'emansummers', 'Brazil'),
# in China
('Hua', 'password', 'Hua', 'Li', '(86)13301432513', 'huali@unnc.com', 'huali', 'China'),
# in Denmark
('Rose', 'password', 'Rose', 'Plant', '(45)632519197', 'roseplant@unnc.com', 'roseplant', 'Denmark'),
# in Egypt
('Elliott', 'password', 'Elliott', 'Shields', '(20)32513625', 'elliottshields@unnc.com', 'elliottshields', 'Egypt'),
# in Japan
('Kosuma', 'password', 'Kosuma', 'Yokuchi', '(81)562763452', 'kosumauokuchi@unnc.com', 'kosumauokuchi', 'Japan'),
# in United Kingdom
('Sherry', 'password', 'Sherry', 'Miller', '(44)135145154', 'sherrymiller@unnc.com', 'sherrymiller', 'United Kingdom'),
# in Mexico
('Rafael', 'password', 'Rafael', 'Tucker', '(52)4321443506', 'rafaeltucker@unnc.com', 'rafaeltucker', 'Mexico');


# 3. Rep data initialization ==========================================================

INSERT INTO Rep
(username, password, first_name, last_name, telephone, email, quota, country, working_status)
VALUES
# in Australia
('Bonita', 'password', 'Bonita', 'Cross', '(61)4152634321', 'bonitacross@unnc.com', 1000, 'Australia', 'active'),
('Zeeshan', 'password', 'Zeeshan', 'Wickens', '(61)9876563244', 'zeeshanwickens@unnc.com', 1000, 'Australia', 'active'),

# in Brazil
('Francesca', 'password', 'Francesca', 'Jones', '(55)432415316', 'francescajones@unnc.com', 1000, 'Brazil', 'active'),
('Drew', 'password', 'Drew', 'Powers', '(55)348096239', 'drewpowers@unnc.com', 1000, 'Brazil', 'active'),

# in China
('Yalan', 'password', 'Yalan', 'Liu', '(86)67584960504', 'yalanliu@unnc.com', 1000, 'China', 'active'),
('Naixuan', 'password', 'Naixuan', 'He', '(86)87439035534', 'naixuanhe@unnc.com', 1000, 'China', 'active'),

# in Denmark
('Everly', 'password', 'Everly', 'Michael', '(45)906295843', 'everlymichael@unnc.com', 1000, 'Denmark', 'active'),
('Kaydee', 'password', 'Kaydee', 'Mathis', '(45)235968305', 'kaydeemathis@unnc.com', 1000, 'Denmark', 'active'),

# in Egypt
('Georgia', 'password', 'Georgia', 'Gill', '(20)43541436', 'georgiagill@unnc.com', 1000, 'Egypt', 'active'),
('Mahir', 'password', 'Mahir', 'Spence', '(20)54166314', 'mahirspence@unnc.com', 1000, 'Egypt', 'active'),

# in Japan
('Cem', 'password', 'Cem', 'Meyer', '(81)973525997', 'cemmeyer@unnc.com', 1000, 'Japan', 'active'),
('Yi', 'password', 'Yi', 'Liku', '(81)809653134', 'yiliku@unnc.com', 1000, 'Japan', 'active'),

# in United Kingdom
('Phyllis', 'password', 'Phyllis', 'Stein', '(44)128437970', 'phyllisstein@unnc.com', 1000, 'United Kingdom', 'active'),
('Kira', 'password', 'Kira', 'Morrow', '(44)454331641', 'kiramorrow@unnc.com', 1000, 'United Kingdom', 'active'),

# in Mexico
('Whitney', 'password', 'Whitney', 'Strong', '(52)6431771371', 'whitneystrong@unnc.com', 1000, 'Mexico', 'active'),
('Edmund', 'password', 'Edmund', 'Lam', '(52)5161413655', 'edmundlam@unnc.com', 1000, 'Mexico', 'active');



# 4. Orders data initialization ==========================================================


INSERT INTO Orders
(customer_ID, rep_ID, start_date, status, post_status, type1_quantity, type2_quantity, type3_quantity, type1_unit_price, type2_unit_price, type3_unit_price)
VALUES
# customer: Sherry Miller, rep: Kira Morrow
# keep in processing but cannot be cancelled by customer and rep
(7, 14, '2020-05-10 00:00:00', 'processing', 'not sold', 200, 200, 200, 4.50, 5.30, 6.70),
# customer: Sherry Miller, rep: Kira Morrow
# keep in processing but will be set as abnormal to be reviewed once the rep cmoplete the first order.
(7, 14, '2020-05-11 00:01:00', 'processing', 'not sold', 100, 200, 300, 4.50, 5.30, 6.70),
# customer: Sherry Miller, rep: Kira Morrow
# keep in processing but will be set as abnormal to be reviewed once the rep cmoplete the first order.
(7, 14, '2020-05-12 00:02:00', 'processing', 'not sold', 300, 200, 100, 4.50, 5.30, 6.70);









