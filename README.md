# ordersApi

ordersApi

documentation: https://documenter.getpostman.com/view/3827865/SzmiXG3c?version=latest

## Requirement:

- install yarn
- install node (v12+)
- install mongodb

## Testing and run:

```
$ yarn

// development
$ yarn run dev

// production
$ yarn run start

// run test case
$ yarn run test

// use eslint and prettier to format code
$ yarn run lint
```

## Docker:

```
// build images and start container in one line
docker-compose up -d --build

// go inside container
docker exec -it <containerId> /bin/bash

// check container logs
docker logs <containerId>

// remove and stop container
docker-compose down
```

open localhost:3000

## Contributing

Please refer to [CONTRIBUTING.md](https://github.com/yeukfei02/ordersApi/blob/master/CONTRIBUTING.md)
