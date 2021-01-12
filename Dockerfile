# syntax=docker/dockerfile:1.2

# -----------------------------------------------------------------------------
# install python dependencies
FROM python:3 AS venv-prep-image

WORKDIR /opt/

RUN python -m venv /opt/venv
# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"

COPY server/requirements.txt .
RUN pip install -r requirements.txt

# -----------------------------------------------------------------------------
# build frontend
FROM node:lts AS frontend-build-image

WORKDIR /opt/

COPY frontend/ .

RUN cp .env.docker .env

RUN PROD=true NODE_ENV=production npm ci
RUN PROD=true NODE_ENV=production npm run build


# -----------------------------------------------------------------------------
# run
FROM python:3-slim AS run-image

EXPOSE 80

COPY --from=venv-prep-image /opt/venv /opt/venv

COPY server /opt/server/

COPY --from=frontend-build-image /opt/build /opt/server/public

WORKDIR /opt/server

# Make sure we use the virtualenv:
ENV PATH="/opt/venv/bin:$PATH"
CMD ["gunicorn", "--worker-class", "eventlet", "-w", "1", "app:app", "-b", "0.0.0.0:80"]
