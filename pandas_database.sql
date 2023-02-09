create database pandas_user_mock_database;

create user 'Neil'@'localhost' identified by 'Hackthebox@1323';
grant all privileges on *.* to 'Neil'@'localhost';

use pandas_user_mock_database;

-- create table
CREATE TABLE accounts (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
    pass_word BINARY(32) NOT NULL,
	email VARCHAR(100),
    inventory VARCHAR(200),
    address VARCHAR(200) NOT NULL,
    postal_code INT NOT NULL,
    recipient BOOLEAN NOT NULL
	);
    
-- add donor accounts
INSERT INTO accounts (first_name, last_name, pass_word, email, address, postal_code, recipient, inventory)
	VALUES ('John', 'Doe', '123',  'johndoe@gmail.com', '123 e street', 987654, false, 'fish and chips'),
		   ('Jane', 'Doe', '123',  'ilovejohndoe@gmail.com', '123 e street', 987654, false, 'baked beans'),
           ('Jack', 'Doe', '123',  'gigachad@gmail.com' ,'123 e street', 987654, false , 'box of cereal'),
           ('Micheal', 'Jackson', 'fje93hfi',  'michaeljackson@yahoo.com', 'jurong', 293832 , false, 'basketball shaped cake'),
           ('Richie', 'Rich', '123',  'richierich@gmail.com' ,'big mansion', 293238 , false, 'golden ice cream'),
           ('Dylan', 'Kusbiyantoro', 'odjwwodj',  'DK@gmail.com', '123 e street', 987654, false, 'fish and chips'),
		   ('Neil', 'Bhandari', 'diwdwnddw',  'NB@gmail.com', '123 e street', 987654, false, 'baked beans'),
           ('Harry', 'Nguyen', 'jfowjowdwd',  'HN@gmail.com' ,'123 e street', 987654, false , 'box of cereal'),
           ('Papangkorn', 'Wangchochedkun', 'fje93hfi',  'coolestguyonearth@gmail.com', 'jurong', 293832 , false, 'basketball shaped cake'),
           ('Colonel', 'Sanders', 'kdwojdjwd',  'ZapWings@gmail.com' ,'big mansion', 293238 , false, 'golden ice cream');


-- add recipient accounts
INSERT INTO accounts (first_name, last_name, pass_word, email, address, postal_code, recipient, inventory)
	VALUES ('Jake', 'Terry', '123',  'JakeyT@gmail.com', '123 e street', 987654, true, NULL),
		   ('Jenny', 'Terry', '123',  '@gmail.com', '123 e street', 987654, true, NULL),
           ('David', 'Beckham', 'jd92ej9d',  'footballz@gmail.com' ,'Somewhere in Northeast', 298230, true, NULL),
           ('Ashley', 'Tan', 'qwertyuiop',  'ashtan@yahoo.com', 'somewhere in jurong', 298391 , true, NULL),
           ('Bob', 'Smarts', '123',  'BobSmarts@gmail.com' ,'house near big mansion', 293238 , true, NULL),
           ('Tobey', 'Maguire', 'ofjefoed',  'spidaman1@gmail.com', '123 e street', 436342, true, NULL),
		   ('Harry', 'Maguire', 'nolookdefending',  'GOAT@gmail.com', '123 e street', 553244, true, NULL),
           ('Andrew', 'Garfield', 'djwojdwjdwo',  'spidaman2@gmail.com' ,'Somewhere in Northeast', 343245, true, NULL),
           ('Tom', 'Holland', 'giwfpdpwdi',  'spidaman3@gmail.com', 'somewhere in jurong', 298391 , true, NULL),
           ('SpongeBob', 'Squarepants', 'ij0ijcpis',  'fastashell@internetexplorer.com' ,'Pineapple Under the Sea', 028023, true, NULL);
           


-- delete table (if you wanna reset it)
-- drop table accounts;
select * from pandas_user_mock_database.accounts;