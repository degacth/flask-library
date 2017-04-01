from .models import Author, Book


def init_api(manager):
    manager.create_api(Author, methods=['GET', 'POST', 'PUT', 'DELETE'])
    manager.create_api(Book, methods=['GET', 'POST', 'PUT', 'DELETE'])
    manager.create_api(Book, methods=['GET'], url_prefix='', collection_name='library/')
