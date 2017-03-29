import os
from json import dumps

from flask import Flask
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy, models_committed

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEBUG = True
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_USE_DB') or 'sqlite:///%s' % (
    os.path.join(BASE_DIR, 'library.db')
)
SQLALCHEMY_TRACK_MODIFICATIONS = True

app = Flask(__name__)
app.config.from_object(__name__)
db = SQLAlchemy(app)


class Author(db.Model):
    author_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))


class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    author_id = db.Column(db.Integer, db.ForeignKey(Author.author_id))
    author = db.relationship(Author)


api_manager = APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Author, methods=['GET', 'POST', 'PUT', 'DELETE'])
api_manager.create_api(Book, methods=['GET', 'POST', 'PUT', 'DELETE'])
api_manager.create_api(Book, methods=['GET'], url_prefix='', collection_name='library/')

_library_statistics = {
    'book_count': 0,
    'author_count': 0,
}


@models_committed.connect
def on_models_commited(sender, changes):
    model, change = changes[0]
    if change not in ('insert', 'delete'):
        return

    label = '%s_count' % model.__table__
    if label in _library_statistics:
        change_count = 1 if change == 'insert' else -1
        _library_statistics[label] += change_count


@app.route('/statistics/')
def statistics():
    return dumps(_library_statistics)


def set_statistics(books=0, authors=0):
    _library_statistics['book_count'] = books
    _library_statistics['author_count'] = authors


db.create_all()
set_statistics(Book.query.count(), Author.query.count())
