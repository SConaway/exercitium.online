# exercitium.online

<!-- ![Test + Deploy](https://github.com/SConaway/exercitium.online/workflows/Test%20+%20Deploy/badge.svg) -->

![Deploy Docker image](https://github.com/SConaway/exercitium.online/workflows/Deploy%20Docker%20image/badge.svg)

## Running in docker

Assuming you have started a redis container named `redis` (`docker run -d --rm --name redis -p 6379:6379 redis`), you can run the following command to start this:

```bash
docker run -it --link redis -e REDIS_HOST=redis -e REDIS_PASS= -e REDIS_PORT=6379 -p 80:80 -d "sconaway/exercitium.online"
```

If you would like to use another redis host, you can remove the `--link redis` and change the appropriate variables (`REDIS_HOST=redis`, `REDIS_PASS`, and `REDIS_PORT`).

There also is a `docker-compose.yml` file you may use: `docker-compose.yml`.
