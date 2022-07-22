# Python Commands

## Enter virtual environment

`source env/bin/activate`

## Exit virtual environment

`deactivate`

## Install requirements

Make sure you're inside of the virtual environment:

```
pip install -r ./requirements.txt
```

# Docker Commands

## Build an image

```
$ docker-compose build
```

## Run the Production Image Locally

```
docker run --name flask-tdd -e "PORT=8765" -p 5005:8765 registry.heroku.com/obscure-lake-05982/web:latest

# bring down container when done
docker rm flask-tdd
```

## Build and run containers in detached mode

```
$ docker-compose up -d --build
```

## Run a command on a specific build

```
$ docker-compose exec <build> <command>
```

Example:

```
$ docker-compose exec api black src --check
```

# PostgreSQL

## Connect to the database via `psql`

```
$ docker-compose exec api-db psql -U postgres
```

# Deployment

The following commands pertain to building the production image, pushing that image to the Heroku container registry, and then releasing the new container image to our production Heroku app

## Build the production image

```
$ docker build -f Dockerfile.prod -t registry.heroku.com/obscure-lake-05982/web .
```

## Push the new image to the container registry

```
$ docker push registry.heroku.com/obscure-lake-05982/web:latest
```

## Release the new image to production Heroku app

```
$ heroku container:release web --app obscure-lake-05982
```

# App-Specific Commands

These commands pertain specifically to how this application was set up.

## Run tests

```
$ docker-compose exec api python -m pytest "src/tests" -p no:warnings
```

## Run tests with coverage

```
$ docker-compose exec api python -m pytest "src/tests" -p no:warnings --cov="src"
```

## Lint

```
$ docker-compose exec api flake8 src
```

## Code quality & formatting

```
$ docker-compose exec api black src
$ docker-compose exec api isort src
```
