#!/usr/bin/env python
import os
import subprocess
import sys


from application import create_app
from flask_script import Manager

manager = Manager(create_app)


@manager.command
def test():
    tests = subprocess.call(['python', '-c', 'import tests; tests.run()'])
    sys.exit(tests)


if __name__ == '__main__':
    if sys.argv[1] in ('test',):
        os.environ['FLASK_CONFIG'] = 'test'
    manager.run()
