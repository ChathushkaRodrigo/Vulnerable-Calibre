FROM python:3.8-slim-buster
	
WORKDIR /app

COPY ./secret.txt ./secret.txt
	
EXPOSE 7777

CMD ["python3","-m","http.server","7777"]
