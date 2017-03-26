# flask-library

## How to install
You must have to activate Python3 env before run commands:
```sh
$ git clone https://github.com/degacth/flask-library
$ cd flask-library
$ pip install -r requirements.txt
$ python manage.py generate
$ python manage.py run
```

## Run tests
```sh
$ python tests.py
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
/statistics/ [GET]
```
