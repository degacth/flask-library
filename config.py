import os


class Config:
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_USE_DB') or 'sqlite:///%s' % (
        os.path.join(BASE_DIR, 'library.db')
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    CELERY_BROKER_URL = 'redis://localhost:6379',
    CELERY_RESULT_BACKEND = 'redis://localhost:6379'


class DevConfig(Config):
    DEBUG = True


class TestConfig(Config):
    TESTING = True
    CELERY_ALWAYS_EAGER = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


configurations = {
    'dev': DevConfig,
    'test': TestConfig,
}
