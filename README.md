# flask-library

## How to install

Install redis and sqlite (on Debian / Ubuntu)
```sh
$ sudo apt install redis-server sqlite3
```

You must have to activate Python3 env before run commands:
```sh
$ git clone https://github.com/degacth/flask-library
$ cd flask-library
$ pip install -r requirements.txt
$ npm i
$ npm run build
$ ln -s ../node_modules/ ./src/node_modules
$ python manage.py initdb
$ python manage.py runserver
```

Also in other terminal run:
```sh
$ python manage.py celery
```

## Run tests
```sh
$ python manage.py test
$ python manage.py e2e
```

## URLs
### Book API
```
/api/book [GET, POST, PUT, DELETE]
```

### Author API
```
/api/author [GET, POST, PUT, DELETE]
```


### Library API
```
/library/ [GET]
```

to change pages you must add query parameter "page":
/library/?page=3

### Statistics API
```
/api/statistics/ [GET]
```
