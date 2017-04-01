import random

from mixer.backend.flask import mixer
from flask import current_app
from application.library.models import Author, Book


def generate(authors_count=9, books_count=99):
    mixer.init_app(current_app)
    authors = list(mixer.blend(Author, name=mixer.faker.name()) for _ in range(authors_count))
    return list(
        mixer.blend(Book, title=mixer.faker.title(), author=random.choice(authors))
        for _ in range(books_count)
    )
