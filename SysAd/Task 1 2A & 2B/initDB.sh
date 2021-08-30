#!/bin/bash

#Create DB and Users
echo "Creating DB 'alphaq' and Table 'MoMDB'"
sudo mysql -u root -e "CREATE DATABASE alphaq;" -e "USE alphaq;" -e "CREATE TABLE MoMDB(date varchar(10) NOT NULL, author varchar(10) NOT NULL, content varchar(1000), PRIMARY KEY(date));"

#Create user JayJay with full perms over DB 'alphaq'
echo "Creating user 'JayJay' with full admin perms"
sudo mysql -u root -e "CREATE USER 'JayJay'@'%' IDENTIFIED BY 'noobmaster69';" -e "GRANT ALL PRIVILEGES ON alphaq.* TO 'JayJay'@'%';" -e "FLUSH PRIVILEGES;"

#Create user unroot with read-only perms to the DB
echo "Creating user 'unroot' with read-only perms"
sudo mysql -u root -e "CREATE USER 'unroot'@'%' IDENTIFIED BY 'unroot123';" -e "GRANT SELECT, SHOW VIEW ON alphaq.* TO 'unroot'@'%';" -e "FLUSH PRIVILEGES;"

#Create user AnuRag with sql_native_password
echo "Creating user 'AnuRag' with full admin perms"
sudo mysql -u root -e "CREATE USER 'AnuRag'@'%' IDENTIFIED WITH mysql_native_password BY 'superuserpass';" -e "GRANT ALL PRIVILEGES ON *.* TO 'AnuRag'@'%';" -e "FLUSH PRIVILEGES;"

#Create local table with users
echo "Creating local table 'users' for auth purposes"
sudo mysql -u root -e "USE alphaq;" -e "CREATE TABLE users(username varchar(16) NOT NULL, password varchar(16) NOT NULL, PRIMARY KEY(username));"

#Insert DB users into Table 'users'
echo "Inserting 'AnuRag' into users"
sudo mysql -u root alphaq -e "INSERT INTO users (username,password) values('AnuRag','superuserpass');"
echo "Inserting 'JayJay' into users"
sudo mysql -u root alphaq -e "INSERT INTO users (username,password) values('JayJay','noobmaster69');"
echo "Inserting 'unroot' into users"
sudo mysql -u root alphaq -e "INSERT INTO users (username,password) values('unroot','unroot123');"