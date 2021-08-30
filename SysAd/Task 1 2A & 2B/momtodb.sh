#!/bin/bash
# Add the content of all the text MoMs to the SQL DB

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
        echo "Pulling MoM for $currentdate from $lastSecondYear's directory and adding to Table 'MoMDB'"
        momfile="/home/$lastSecondYear/${date%,}_mom.txt"
        content=$(<$momfile)
        sudo mysql -u root alphaq -e "INSERT INTO MoMDB (date, author, content) VALUES ('$currentdate', '$lastSecondYear', '$content');"
        currentdate=${date%,}
    fi
done < attendance-log.txt