#!/bin/bash
# Reset the SQL DB and users
echo 'Dropping DB'
sudo mysql -u root -e "DROP DATABASE alphaq;"
echo "Dropping user 'JayJay'"
sudo mysql -u root -e "DROP USER 'JayJay'@'%';"
echo "Dropping user 'unroot'"
sudo mysql -u root -e "DROP USER 'unroot'@'%';"
echo "Dropping user 'AnuRag'"
sudo mysql -u root -e "DROP USER 'AnuRag'@'%';"