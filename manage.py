#!/usr/bin/env python
import subprocess

import sys

from application import app, db
from fixtures import generate
from flask_script import Manager

manager = Manager(app)


@manager.command
def run():
    app.run()


@manager.command
def test():
    """Runs unit tests."""
    tests = subprocess.call(['python', '-c', 'import tests; tests.run()'])
    sys.exit(tests)


manager.command(generate)

if __name__ == '__main__':
    manager.run()
