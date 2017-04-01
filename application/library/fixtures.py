import random

from mixer.backend.flask import mixer

from application.library.models import Author, Book
from application import app

mixer.init_app(app)


def generate(authors_count: int = 9, books_count: int = 99):
    authors = list(mixer.blend(Author, name=mixer.faker.name()) for _ in range(authors_count))
    list(
        mixer.blend(Book, title=mixer.faker.title(), author=random.choice(authors))
        for _ in range(books_count)
    )
