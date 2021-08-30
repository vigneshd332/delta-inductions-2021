#!/bin/bash
# Script to assign permissions to respective Users

i=2
group=SysAd_
while [ $i -le 3 ]
do
    if [ $i -le 2 ]
    then
        j=1
        while [ $j -le 9 ] #Give perms to SysAd_2
        do
            sudo setfacl -m "g:$group$i:r" "/home/sysAd_0$j"
            echo Giving $group$i access to sysAd_0$j \'s home directory
            ((j++))
        done
        sudo setfacl -m "g:$group$i:r" "/home/sysAd_$j"
        echo Giving $group$i access to sysAd_10 \'s home directory
        j=1
        group=appDev_
        while [ $j -le 9 ] #Give perms to appDev_2
        do
            sudo setfacl -m "g:$group$i:r" "/home/appDev_0$j"
            echo Giving $group$i access to appDev_0$j \'s home directory
            ((j++))
        done
        sudo setfacl -m "g:$group$i:r" "/home/appDev_$j"
        echo Giving $group$i access to appDev_10 \'s home directory
        j=1
        group=webDev_
        while [ $j -le 9 ] #Give perms to webDev_2
        do
            sudo setfacl -m "g:$group$i:r" "/home/webDev_0$j"
            echo Giving $group$i access to webDev_0$j \'s home directory
            ((j++))
        done
        sudo setfacl -m "g:$group$i:r" "/home/webDev_$j"
        echo Giving $group$i access to webDev_10 \'s home directory
        
    else
        j=1
        group=SysAd_
        while [ $j -le 9 ] #Give perms to SysAd_3
        do
            sudo setfacl -m "g:$group$i:r" "/home/sysAd_0$j"
            echo Giving $group$i access to sysAd_0$j \'s home directory
            ((j++))
        done
        while [ $j -le 20 ]
        do
            sudo setfacl -m "g:$group$i:r" "/home/sysAd_$j"
            echo Giving $group$i access to sysAd_$j \'s home directory
            ((j++))
        done
        j=1
        group=appDev_
        while [ $j -le 9 ] #Give perms to appDev_3
        do
            sudo setfacl -m "g:$group$i:r" "/home/appDev_0$j"
            echo Giving $group$i access to appDev_0$j \'s home directory
            ((j++))
        done
        while [ $j -le 20 ]
        do
            sudo setfacl -m "g:$group$i:r" "/home/appDev_$j"
            echo Giving $group$i access to appDev_$j \'s home directory
            ((j++))
        done
        j=1
        group=webDev_
        while [ $j -le 9 ] #Give perms to webDev_3
        do
            sudo setfacl -m "g:$group$i:r" "/home/webDev_0$j"
            echo Giving $group$i access to webDev_0$j \'s home directory
            ((j++))
        done
        while [ $j -le 20 ]
        do
            sudo setfacl -m "g:$group$i:r" "/home/webDev_$j"
            echo Giving $group$i access to webDev_$j \'s home directory
            ((j++))
        done
    fi
    ((i++))
done

j=1
group=admin
while [ $j -le 9 ]  #Give perms to admin
do
    sudo setfacl -m "g:$group:r" "/home/sysAd_0$j"
    echo Giving $group access to sysAd_0$j \'s home directory
    ((j++))
done
while [ $j -le 30 ]
do
    sudo setfacl -m "g:$group:r" "/home/sysAd_$j"
    echo Giving $group access to sysAd_$j \'s home directory
    ((j++))
done
j=1
while [ $j -le 9 ]
do
    sudo setfacl -m "g:$group:r" "/home/appDev_0$j"
    echo Giving $group access to appDev_0$j \'s home directory
    ((j++))
done
while [ $j -le 30 ]
do
    sudo setfacl -m "g:$group:r" "/home/appDev_$j"
        echo Giving $group access to appDev_$j \'s home directory
    ((j++))
done
j=1
while [ $j -le 9 ]
do
    sudo setfacl -m "g:$group:r" "/home/webDev_0$j"
    echo Giving $group access to webDev_0$j \'s home directory
    ((j++))
done
while [ $j -le 30 ]
do
    sudo setfacl -m "g:$group:r" "/home/webDev_$j"
    echo Giving $group access to webDev_$j \'s home directory
    ((j++))
done
