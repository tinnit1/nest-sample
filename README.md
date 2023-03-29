<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# run develop project

1. Clone repositorie
2. execute 
```
Yarn install
```
3. Install nest CLI
```
npm i -g @nestjs/cli
```
4. up database
```
docker-compose up -d
```

5. Clone __.env.template__ file and rename file as __.env__

6. fill required variables in 

```
.env
```
7. run app on dev mode 
```
yarn start:dev
```
8. rebuild database info with seed endpoint
```
http://localhost:3000/api/v2/seed
```

## Production build

1. create __.env.prod__ file and fill that
2. create the image
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```

## Stack
* MongoDB
* Nest