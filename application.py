import os
from json import dumps

from celery import Celery
from flask import Flask
from flask import Response
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEBUG = True
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_USE_DB') or 'sqlite:///%s' % (
    os.path.join(BASE_DIR, 'library.db')
)
SQLALCHEMY_TRACK_MODIFICATIONS = True
CELERY_BROKER_URL = 'redis://localhost:6379',
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_ALWAYS_EAGER = True
PRESERVE_CONTEXT_ON_EXCEPTION = False

app = Flask(__name__)
app.config.from_object(__name__)
db = SQLAlchemy(app)


def make_celery(app):
    celery = Celery(app.import_name, backend=app.config['CELERY_RESULT_BACKEND'],
                    broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            # with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery


celery = make_celery(app)


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

library_statistics = {
    'book_count': 0,
    'author_count': 0,
}


@celery.task
def update_statistics():
    return {
        'book_count': Book.query.count(),
        'author_count': Author.query.count(),
    }

f = lambda *args: library_statistics.update(update_statistics.delay().wait())
event.listen(Author, 'after_delete', f)
event.listen(Author, 'after_insert', f)
event.listen(Book, 'after_delete', f)
event.listen(Book, 'after_insert', f)


@app.route('/statistics/')
def statistics():
    return Response(response=dumps(library_statistics), mimetype='application/json')


db.create_all()
library_statistics.update(update_statistics.delay().wait())
