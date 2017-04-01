import os

from celery import Celery
from flask import Flask
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy

import config as cfg

app = Flask(__name__)
config_name = os.environ.get('FLASK_CONFIG', 'dev')
config = cfg.configurations[config_name]
app.config.from_object(config)
db = SQLAlchemy(app)


def make_celery(_app: Flask) -> Celery:
    _celery = Celery(_app.import_name,
                     backend=_app.config['CELERY_RESULT_BACKEND'],
                     broker=_app.config['CELERY_BROKER_URL']
                     )
    _celery.conf.update(_app.config)
    TaskBase = _celery.Task

    class ContextTask(TaskBase):
        abstract = True

        def __call__(self, *args, **kwargs):
            if app.config['TESTING']:
                return TaskBase.__call__(self, *args, **kwargs)
            else:
                with app.app_context():
                    return TaskBase.__call__(self, *args, **kwargs)

    _celery.Task = ContextTask
    return _celery


celery = make_celery(app)

with app.app_context():
    api_manager = APIManager(app, flask_sqlalchemy_db=db)

    from .library.api import init_api

    init_api(api_manager)

    from .statistics.api import statistics_bp

    app.register_blueprint(statistics_bp, url_prefix='/statistics')
