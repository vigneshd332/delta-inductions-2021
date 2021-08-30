#!/bin/bash

#format ./attendance.sh     For displaying all absent users in all dates in the log file
#       ./attendance.sh <starting-date> <ending-date> (without angle brackets)     For absentees between two given dates
# all dates should be in YYYY-MM-DD format

startdate=$1
enddate=$2
initial=0
trigger1=0
if [ -z $startdate ] && [ -z $enddate ]
then
    while IFS=' ' read -r col1 col2 col3 col4
    do
        if [ $initial -le 0 ]
        then
            date="${col3%,}"
            initial=99
        fi
        if [ "${col3%,}" = "$date" ]
        then
            currentdate=$col3
            echo $col1 >> temp.txt
        else
            date="${col3%,}"
            for user in `cat users.txt`
            do
                for users in `cat temp.txt`
                do
                    present=0
                    if [ "$users" = "$user" ]
                    then
                        present=1
                        break
                    fi
                done
                if [ $present -le 0 ]
                then
                    echo "$user was absent on ${currentdate%,}"
                fi
            done
            >temp.txt
        fi
    done < attendance-log.txt
    for user in `cat users.txt`
    do
        for users in `cat temp.txt`
        do
            present=0
            if [ "$users" = "$user" ]
            then
                present=1
                break
            fi
        done
        if [ $present -le 0 ]
        then
            echo "$user was absent on ${currentdate%,}"
        fi
    done
    >temp.txt
    rm -rf ./temp.txt
else
    while IFS=' ' read -r col1 col2 col3 col4
    do
        if [ $initial -le 0 ]
        then
        date="$1"
        initial=99
        fi
        if [ "${col3%,}" = "$date" ]
        then
            currentdate=$col3
            echo $col1 >> temp.txt
        else
            date="${col3%,}"
            if [ "${col3%,}" = "$2" ]
            then
                trigger1=1
            fi
            for user in `cat users.txt`
            do
                for users in `cat temp.txt`
                do
                    present=0
                    if [ "$users" = "$user" ]
                    then
                        present=1
                        break
                    fi
                done
                if [ $present -le 0 ]
                then
                    echo "$user was absent on ${currentdate%,}"
                fi
            done
            >temp.txt
            if [ $trigger1 -ge 1 ] && [ "${col3%,}" != "$2" ]
            then
                rm -rf ./temp.txt
                exit
            fi
        fi
    done < attendance-log.txt   
fi
