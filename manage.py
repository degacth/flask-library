from application import app, db
from fixtures import generate
from flask_script import Manager

manager = Manager(app)


@manager.command
def run():
    app.run()


manager.command(generate)

if __name__ == '__main__':
    manager.run()
