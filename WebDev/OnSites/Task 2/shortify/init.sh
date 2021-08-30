#!/bin/bash

#Install node modules
echo "Installing Node Modules"
npm i

#Install py modules
echo "Installing Python Dependencies"
pip install -r requirements.txt

#Create database
echo "Creating database 'shortify'"
sudo mysql -u root -e "CREATE DATABASE IF NOT EXISTS shortify;"

#Create user
echo "Creating user 'shortify' with password 'smolboiurls'"
sudo mysql -u root -e "CREATE USER 'shortify'@'%' IDENTIFIED BY 'smolboiurls';" -e "GRANT ALL PRIVILEGES ON shortify.* TO 'shortify'@'%';" -e "FLUSH PRIVILEGES;"

#Create table urls
echo "Creating table 'urls'"
sudo mysql -u root -e "USE shortify;" -e "CREATE TABLE IF NOT EXISTS urls(id INT(11) NOT NULL AUTO_INCREMENT, longurl VARCHAR(255) NOT NULL, shortedurl VARCHAR(255) NOT NULL,locationdata VARCHAR(500), clicks VARCHAR(10), PRIMARY KEY (id));"