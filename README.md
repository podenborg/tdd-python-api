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

## Rebuild the image locally

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

# Heroku Commands

## Publish a new build

```
docker build -f Dockerfile.prod -t registry.heroku.com/obscure-lake-05982/web .

docker push registry.heroku.com/obscure-lake-05982/web:latest

heroku container:release web --app obscure-lake-05982
```

## Run the Production Build Locally

```
docker run --name flask-tdd -e "PORT=8765" -p 5005:8765 registry.heroku.com/obscure-lake-05982/web:latest

# bring down container when done
docker rm flask-tdd
```

# Pytest Commands

## normal run

$ docker-compose exec api python -m pytest "src/tests"

# disable warnings

$ docker-compose exec api python -m pytest "src/tests" -p no:warnings

## run only the last failed tests

$ docker-compose exec api python -m pytest "src/tests" --lf

# run only the tests with names that match the string expression

$ docker-compose exec api python -m pytest "src/tests" -k "config and not test_development_config"

## stop the test session after the first failure

$ docker-compose exec api python -m pytest "src/tests" -x

# enter PDB after first failure then end the test session

$ docker-compose exec api python -m pytest "src/tests" -x --pdb

## stop the test run after two failures

$ docker-compose exec api python -m pytest "src/tests" --maxfail=2

# show local variables in tracebacks

$ docker-compose exec api python -m pytest "src/tests" -l

## list the 2 slowest tests

$ docker-compose exec api python -m pytest "src/tests" --durations=2
