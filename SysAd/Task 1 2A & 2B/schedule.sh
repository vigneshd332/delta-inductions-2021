#!/bin/bash
crontab -e 
0  0  *  *  * "/media/vk/Local Disk/WebApps/Delta/SysAd/Task 1/schedule.sh" >/dev/null 2>&1 #Cronjob which runs at midnight

date=$(date +%Y-%m-%d)
while IFS=' ' read -r col1 col2 #reads future.txt and seperates lines into 2 columns
do 
    if [ "$date" = "$col1" ] #compares current date with schedule
    then
        for user in `cat users.txt` #reads users
        do
            echo "$col1 $col2" >> /home/$user/schedule.txt #writes schedule
        done     
    fi
done < future.txt