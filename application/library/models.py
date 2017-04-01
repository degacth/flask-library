from application import db


class Author(db.Model):
    author_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))


class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    author_id = db.Column(db.Integer, db.ForeignKey(Author.author_id))
    author = db.relationship(Author)