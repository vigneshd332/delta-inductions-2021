# Build : docker build -t "alphaqserver" .
# Run   : docker run -t -i alphaqserver

FROM mysql:8.0.25

VOLUME [ "var/lib/mysql" ]

RUN apt update && apt install sudo
RUN apt install -y cron
RUN apt install -y vim
RUN apt install -y acl

ENV GenUser_PATH "/home/temp/dockerbuild/genUser.sh"
ENV Permit_PATH "/home/temp/dockerbuild/permit.sh"
ENV Schedule_PATH "/home/temp/dockerbuild/schedule.sh"
ENV Attendance_PATH "/home/temp/dockerbuild/attendance.sh"
ENV ClearSys_PATH "/home/temp/dockerbuild/clearSystem.sh"
ENV Future_PATH "/home/temp/dockerbuild/future.txt"
ENV AtnLog_PATH "/home/temp/dockerbuild/attendance-log.txt"
ENV genMoM_PATH "/home/temp/dockerbuild/genMoM.sh"
ENV getMoM_PATH "/home/temp/dockerbuild/getMoM.sh"
ENV initDB_PATH "/home/temp/dockerbuild/initDB.sh"
ENV clearDB_PATH "/home/temp/dockerbuild/clearDB.sh"

ADD ./genUser.sh ${GenUser_PATH}
ADD ./permit.sh ${Permit_PATH}
ADD ./schedule.sh ${Schedule_PATH}
ADD ./attendance.sh ${Attendance_PATH}
ADD ./clearSystem.sh ${ClearSys_PATH}
ADD ./future.txt ${Future_PATH}
ADD ./attendance-log.txt ${AtnLog_PATH}
ADD ./genMoM.sh ${genMoM_PATH}
ADD ./getMoM.sh ${getMoM_PATH}
ADD ./initDB.sh ${initDB_PATH}
ADD ./clearDB.sh ${clearDB_PATH}

RUN chmod +x ${GenUser_PATH}
RUN chmod +x ${Permit_PATH}
RUN chmod +x ${Schedule_PATH}
RUN chmod +x ${Attendance_PATH}
RUN chmod +x ${ClearSys_PATH}
RUN chmod +x ${genMoM_PATH}
RUN chmod +x ${getMoM_PATH}
RUN chmod +x ${initDB_PATH}
RUN chmod +x ${clearDB_PATH}

RUN bash ${GenUser_PATH}
RUN bash ${Permit_PATH}
#RUN bash ${initDB}

RUN echo Done...