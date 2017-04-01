from flask_restless import APIManager

from application import app, db
from .models import Author, Book

manager = APIManager(app, flask_sqlalchemy_db=db)

author_bp = manager.create_api_blueprint(Author, methods=['GET', 'POST', 'PUT', 'DELETE'])
book_bp = manager.create_api_blueprint(Book, methods=['GET', 'POST', 'PUT', 'DELETE'])
library_bp = manager.create_api_blueprint(Book, methods=['GET'], url_prefix='', collection_name='library/')
