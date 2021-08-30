#!/bin/bash
# Generating MoMs for last joining 2nd Years based on attendance-log.txt
init=0
while IFS=' ' read -r name ignore date tyme
do
    if [ $init -le 0 ]
    then
        currentdate=${date%,}
        init=1
    fi
    id=$(echo "$name" | cut -d'_' -f2)
    if [ $id -le 10 ]
    then
        lastSecondYear=$name
    fi
    if [ "${date%,}" != "$currentdate" ]
    then
        echo "Creating MoM for $currentdate on $lastSecondYear's directory"
        output="/home/$lastSecondYear/${date%,}_mom.txt"
        echo "Is date mein $currentdate Ek gau mein ek kisan raghu thatha" >> $output
        currentdate=${date%,}
    fi
done < attendance-log.txt