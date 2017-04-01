import os

from celery import Celery
from flask import Flask
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy

import config as cfg

db = SQLAlchemy()
celery = Celery(__name__,
                broker=os.environ.get('CELERY_BROKER_URL', 'redis://'),
                backend=os.environ.get('CELERY_BROKER_URL', 'redis://'))


def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_CONFIG', 'dev')

    app = Flask(__name__)
    config = cfg.configurations[config_name]
    app.config.from_object(config)
    db.init_app(app)
    celery.conf.update(app.config)

    with app.app_context():
        api_manager = APIManager(app, flask_sqlalchemy_db=db)

        from .library.api import init_api
        init_api(api_manager)

    return app
