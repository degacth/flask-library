import unittest
import sys
from functools import partial
from json import dumps

from flask_testing import TestCase
from application import db, create_app
from application.library.models import Author, Book
from fixtures import generate


class BaseTestCase(TestCase):
    create_app = partial(create_app, 'test')

    def setUp(self):
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()


class ApiTestCase(BaseTestCase):
    def test_book_api(self):
        book_title = 'helloworld'
        author_name = 'Alexander'
        author = Author()
        author.name = author_name
        db.session.add(author)
        db.session.commit()

        # POST
        res = self.client.post('/api/book', data=dumps({
            'title': book_title,
            'author_id': author.author_id
        }), content_type='application/json')
        self.assert_status(res, 201)
        self.assertEqual(Book.query.one().title, book_title)

        # GET
        res = self.client.get('/api/book')
        self.assert200(res)
        books = res.json['objects']
        self.assertEqual(len(books), 1)
        book = books[0]
        self.assertEqual(book['title'], book_title)

        # GET SINGLE
        res = self.client.get('/api/book/%s' % book['book_id'])
        self.assert200(res)

        # PUT
        book['title'] = book_title * 2
        res = self.client.put('/api/book/%s' % book['book_id'], data=dumps(book),
                              content_type='application/json')
        self.assert200(res)
        self.assertEqual(Book.query.one().title, book_title * 2)

        # DELETE
        res = self.client.delete('/api/book/%s' % book['book_id'])
        self.assert_status(res, 204)
        self.assertEqual(len(Book.query.all()), 0)

    def test_author_api(self):
        author_name = 'Alexander'

        # POST
        res = self.client.post('/api/author', data=dumps({
            'name': author_name
        }), content_type='application/json')
        self.assert_status(res, 201)
        self.assertEqual(Author.query.one().name, author_name)

        # GET
        res = self.client.get('/api/author')
        self.assert200(res)
        authors = res.json['objects']
        self.assertEqual(len(authors), 1)
        author = authors[0]
        self.assertEqual(author['name'], author_name)

        # GET SINGLE
        res = self.client.get('/api/author/%s' % author['author_id'])
        self.assert200(res)

        # PUT
        author['name'] = author_name * 2
        res = self.client.put('/api/author/%s' % author['author_id'], data=dumps(author),
                              content_type='application/json')
        self.assert200(res)
        self.assertEqual(Author.query.one().name, author_name * 2)

        # DELETE
        res = self.client.delete('/api/author/%s' % author['author_id'])
        self.assert_status(res, 204)
        self.assertEqual(len(Author.query.all()), 0)


class LibraryTestCase(BaseTestCase):
    def test_library_api(self):
        generate(5, 15)
        res = self.client.get('/library/')
        self.assert200(res)
        json = res.json
        self.assertEqual(json['num_results'], 15)
        self.assertEqual(json['page'], 1)
        self.assertEqual(json['total_pages'], 2)
        self.assertEqual(len(json['objects']), 10)

        res = self.client.get('/library/?page=2')
        self.assertEqual(len(res.json['objects']), 5)


class StatisticsTestCase(BaseTestCase):
    def test_statictics_api(self):
        generate(20, 60)
        res = self.client.get('/statistics/')
        self.assert200(res)
        self.assertEqual(res.json, {
            'book_count': 60,
            'author_count': 20,
        })

        # Add author
        author = Author(name='Alexander')
        db.session.add(author)
        db.session.commit()

        # Remove book
        self.client.delete('/api/book/%s' % Book.query.first().book_id)

        res = self.client.get('/statistics/')
        self.assert200(res)
        self.assertEqual(res.json, {
            'book_count': 59,
            'author_count': 21,
        })

def run():
    tests = unittest.TestLoader().discover('.')
    sys.exit(
        int(not unittest.TextTestRunner(verbosity=2).run(tests).wasSuccessful())
    )
