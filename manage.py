#!/usr/bin/env python
import os
import subprocess
import sys

from application import create_app
from flask_script import Manager, Command

manager = Manager(create_app)


class CeleryWorker(Command):
    name = 'celery'
    capture_all_args = True

    def run(self, argv):
        ret = subprocess.call(
            ['celery', 'worker', '-A', 'application.celery'] + argv)
        sys.exit(ret)


manager.add_command("celery", CeleryWorker())


@manager.command
def test():
    tests = subprocess.call(['python', '-c', 'import tests; tests.run()'])
    sys.exit(tests)


if __name__ == '__main__':
    if sys.argv[1] in ('test',):
        os.environ['FLASK_CONFIG'] = 'test'
    manager.run()
