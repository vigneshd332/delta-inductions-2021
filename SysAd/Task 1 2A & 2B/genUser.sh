#!/bin/bash
#Script to generate Users and add them to the System


output=users.txt
i=1

if [ -s users.txt ]
then
   echo "$output appears to have users already. Clear $output and try again if this script was modified"
   exit
else
   echo 'Generating users to user.txt...'
fi

while [ $i -le 30 ] #Generate SysAd Users
do
   if [ $i -le 9 ]
   then
   user="sysAd_0$i"
   else
   user="sysAd_$i"
   fi
   echo "$user" >> $output
   ((i++))
done
i=1 
while [ $i -le 30 ] #Generate appDev Users
do
   if [ $i -le 9 ]
   then
   user="appDev_0$i"
   else
   user="appDev_$i"
   fi
   echo "$user" >> $output
   ((i++))
done
i=1 
while [ $i -le 30 ] #Generate webDev Users
do
   if [ $i -le 9 ]
   then
   user="webDev_0$i"
   else
   user="webDev_$i"
   fi
   echo "$user" >> $output
   ((i++))
done
echo 'Jay_Jay'>> $output #Generate Admin User

for user in `cat users.txt` #Add all Users
do
    echo Creating "$user" and their home directory
    sudo useradd -m $user
    echo "$user:$user@123" | sudo chpasswd
done

number=1 #Group Creation and Adding Users

sudo groupadd SysAd_1
sudo groupadd SysAd_2
sudo groupadd SysAd_3
sudo groupadd appDev_1
sudo groupadd appDev_2
sudo groupadd appDev_3
sudo groupadd webDev_1
sudo groupadd webDev_2
sudo groupadd webDev_3
sudo groupadd admin

for user in `cat users.txt`
do

    if [ $number -le 10 ]
    then
        group='SysAd_1'
    elif [ $number -le 20 ]
    then
        group='SysAd_2'
    elif [ $number -le 30 ]
    then
        group='SysAd_3'
    elif [ $number -le 40 ]
    then
        group='appDev_1'
    elif [ $number -le 50 ]
    then
        group='appDev_2'
    elif [ $number -le 60 ]
    then
        group='appDev_3'
    elif [ $number -le 70 ]
    then
        group='webDev_1'
    elif [ $number -le 80 ]
    then
        group='webDev_2'
    elif [ $number -le 90 ]
    then
        group='webDev_3'
    else
        group='admin'
    fi
    sudo usermod -a -G "$group" "$user"
    echo "$user" added to group "$group"
    ((number++))
done