#!/bin/bash
# Getting MoMs in a certain timeframe

startdate=$1
enddate=$2
trigger=0
trigger2=0
output="/home/Jay_Jay/moms.txt"
sudo rm -rf /home/Jay_Jay/moms.txt
echo "MoMDate   MoMTaker    MoMPath" >> $output
if [ -z $startdate ] && [ -z $enddate ]
then
    echo "Please specify the start and end dates"
else
    currentdate=$startdate
    while IFS=' ' read -r name ignore date tyme
    do
        if [ "${date%,}" = "$currentdate" ]
        then
            trigger2=1
        fi
        if [ $trigger2 -ge 1 ]
        then
            id=$(echo "$name" | cut -d'_' -f2)
            if [ $id -le 10 ]
            then
                lastSecondYear=$name
            fi
            if [ "${date%,}" != "$currentdate" ]
            then
                echo "Fetching MoM for $currentdate from $lastSecondYear's directory"
                echo "$currentdate $lastSecondYear /user/$lastSecondYear/${currentdate}_mom.txt" >> $output
                currentdate=${date%,}
            fi
            if [ "$enddate" = "$date" ]
            then
                trigger=1
            fi
            if [ $trigger -ge 1 ] && [ "$enddate" != "${date%,}" ]
            then
                exit
            fi
        fi
    done < attendance-log.txt
fi