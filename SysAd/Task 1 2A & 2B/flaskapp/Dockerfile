# Build : sudo docker build -t myimage ./
# Run   : sudo docker run -t -p 5000:5000 -i myimage

FROM tiangolo/meinheld-gunicorn-flask:python3.7
# FROM mysql:8.0.25

COPY . ./app

RUN apt update && apt install sudo
RUN pip3 install -r ./app/requirements.txt

EXPOSE 5000
EXPOSE 3306

ENTRYPOINT [ "python3" ]
CMD [ "./app/main.py" ]