#!/bin/bash

echo "Creating DB 'wepoll'"
sudo mysql -u root -e "CREATE DATABASE wepoll;"

#Create user admin with full perms over DB 'wepoll' for website I/O
echo "Creating user 'admin' with full admin perms"
sudo mysql -u root -e "CREATE USER 'admin'@'%' IDENTIFIED BY 'noobmaster69';" -e "GRANT ALL PRIVILEGES ON wepoll.* TO 'admin'@'%';" -e "FLUSH PRIVILEGES;"

#Create local table with users
echo "Creating local table 'users'"
sudo mysql -u root -e "USE wepoll;" -e "CREATE TABLE users(username varchar(16) NOT NULL, password varchar(16) NOT NULL, usertype varchar(10), team varchar(32), PRIMARY KEY(username));"
sudo mysql -u root wepoll -e "INSERT INTO users (username,password) values('admin','noobmaster69');"

#Create local table for teams
echo "Creating local table 'teams'"
sudo mysql -u root -e "USE wepoll;" -e "CREATE TABLE teams(teamname varchar(16) NOT NULL, member1 varchar(16) NOT NULL, member2 varchar(16), member3 varchar(16), member4 varchar(16), PRIMARY KEY(teamname));"

#Create local table for polls
echo "Creating local table 'polls'"
sudo mysql -u root -e "USE wepoll;" -e "CREATE TABLE polls(teamname varchar(16) NOT NULL, pollname varchar(16) NOT NULL, options varchar(256) NOT NULL, state varchar(5) NOT NULL, votes varchar(32), voted varchar(256),assigned varchar(256), PRIMARY KEY(pollname));"