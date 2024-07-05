lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

server:
	npx start-server

deploy:
	git push heroku main

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	cd frontend && npm run build