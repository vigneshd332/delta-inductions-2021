#!/bin/bash
#Script to delete all the Users and groups from the system to start from a clean slate

for user in `more users.txt`
do
    echo Deleting "$user" and removing their home directory
    sudo userdel $user
    sudo rm -r "/home/$user"
done

sudo groupdel SysAd_1
sudo groupdel SysAd_2
sudo groupdel SysAd_3
sudo groupdel webDev_1
sudo groupdel webDev_2
sudo groupdel webDev_3
sudo groupdel appDev_1
sudo groupdel appDev_2
sudo groupdel appDev_3
sudo groupdel admin
> users.txt