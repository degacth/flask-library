import random

from mixer.backend.flask import mixer
from application import Author, Book, app


mixer.init_app(app)


def generate(authors_count=9, books_count=99):
    authors = list(mixer.blend(Author, name=mixer.faker.name()) for _ in range(authors_count))
    return list(
        mixer.blend(Book, title=mixer.faker.title(), author=random.choice(authors))
        for _ in range(books_count)
    )
