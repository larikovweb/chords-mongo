mongo:
	docker run -p 27017:27017 \
	-d \
	--rm \
	--name mongodb \
	--network notes-net \
	--env-file ./config/development.env \
	-v mongo-data:/data/db \
	mongo

backend:
	docker run -p 5050:5050 \
	-d \
	--rm \
	--name notes-backend \
	--network notes-net \
	-v /Users/urijlarikov/Documents/lessons/docker/practic/docker-mern/server:/app \
	-v /app/node_modules \
	--env-file ./config/development.env \
	notes-backend

frontend:
	docker run -p 3000:3000 \
	-d \
	--rm \
	--name notes-frontend \
	-v /Users/urijlarikov/Documents/lessons/docker/practic/docker-mern/client/src:/app/src \
	--network notes-net \
	notes-frontend

stop:
	docker stop mongodb notes-backend notes-frontend

dev:
	docker-compose -f docker-compose.yml up -d

build:
	docker-compose -f docker-compose.production.yml build

# SSH
SSH_STRING:=root@62.217.179.82

ssh:
	ssh ${SSH_STRING}

copy-files:
	scp -r ./* ${SSH_STRING}:/root/app