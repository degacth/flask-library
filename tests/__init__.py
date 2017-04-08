import sys
import unittest


def run(pattern='unit*.py'):
    tests = unittest.TestLoader().discover('.', pattern)
    sys.exit(
        int(not unittest.TextTestRunner(verbosity=2).run(tests).wasSuccessful())
    )
