# exercitium.online

![Test + Deploy](https://github.com/SConaway/exercitium.online/workflows/Test%20+%20Deploy/badge.svg)

## Running in docker:

Assuming you have started a redis container named `redis`, you can run the following command to start this:

```bash
docker run -it --link redis -e REDIS_HOST=redis -e REDIS_PASS= -e REDIS_PORT=6379 -p 8123:80 "**image source**/exercitium.online"
```
