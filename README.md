# exercitium.online

<!-- ![Test + Deploy](https://github.com/SConaway/exercitium.online/workflows/Test%20+%20Deploy/badge.svg) -->

![Deploy Docker image](https://github.com/SConaway/exercitium.online/workflows/Deploy%20Docker%20image/badge.svg)

## Running in docker

Assuming you have started a redis container named `redis` (`docker run -d --rm --name redis -p 6379:6379 redis`), you can run the following command to start this:

```bash
docker run -it --link redis -e REDIS_HOST=redis -e REDIS_PASS= -e REDIS_PORT=6379 -p 80:80 -d "sconaway/exercitium.online"
```

If you would like to use another redis host, you can remove the `--link redis` and change the appropriate variables (`REDIS_HOST`, `REDIS_PASS`, and `REDIS_PORT`).

There also is a `docker-compose.yml` file you may use: `docker-compose.yml`.

## Running locally

1. In `frontend/`
    1. `npm ci` to install dependencies
    2. `PROD=true NODE_ENV=production npm run build` to build the frontend
    3. `cp build/ ../server/public` so the server has something to serve
2. In `server/`
    1. `python3 -m venv env` to create a virtual environment (technically optional, but highly recommended)
    2. `pip3 install -r requirements.txt` to install dependencies
    3. `gunicorn --worker-class eventlet -w 1 app:app -b 0.0.0.0:80` to run in production mode

## Development

1. In `frontend/`
    1. `npm install` to install dependencies
    2. `PROD=false NODE_ENV=development npm start` to begin serving the front-end
    3. `PROD=true NODE_ENV=production npm run build && cp -r build/ ../server/public` to build the frontend, repeat if you want to test changes as served from the main server
2. Start a redis server: `docker run -d --rm --name redis -p 6379:6379 redis`
    1. If you would like to use another redis host, you can by changing the appropriate variables (`REDIS_HOST`, `REDIS_PASS`, and `REDIS_PORT`).
3. In `server/`
    1. `python3 -m venv env` to create a virtual environment (technically optional, but highly recommended)
    2. `pip3 install -r requirements.txt` to install dependencies
    3. `CORS_HEADERS="*" REDIS_HOST="localhost" REDIS_PASS="" REDIS_PORT="6379" DEBUG=true python app.py` to run in development mode

-   `localhost:8080` will be the frontend in development mode. Any changes made here will auto update
-   `localhost:5000` will be the frontend in production mode. Any changes made here will NOT auto update (you can use a helper to cause this (`nodemon`: `nodemon --exec CORS_HEADERS="*" REDIS_HOST="localhost" REDIS_PASS="" REDIS_PORT="6379" DEBUG=true python app.py`))
