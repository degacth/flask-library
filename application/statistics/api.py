import contextlib
import os
from itertools import product
from json import dumps

from flask import Blueprint, Response

from application import celery, db
from application.library.models import Author, Book

statistics_bp = Blueprint('statistics', __name__)
statistics_file = os.path.join(os.path.dirname(__file__), 'statistics.info')

# remove cached statistics info
with contextlib.suppress(FileNotFoundError):
    os.remove(statistics_file)


@statistics_bp.route('/')
def statistics_main():
    try:
        with open(statistics_file, 'r') as fh:
            response = fh.read()
    except FileNotFoundError:
        response = update_statistics()

    return Response(response, mimetype='application/json')


@celery.task
def update_statistics() -> str:
    content = dumps({
        'book_count': Book.query.count(),
        'author_count': Author.query.count(),
    })
    with open(statistics_file, 'w') as fh:
        fh.write(content)

    return content


# cartesian for orm events
for model, event in product((Author, Book), ('after_insert', 'after_delete')):
    db.event.listen(model, event, lambda *args: update_statistics.delay())
